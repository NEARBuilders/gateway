#![allow(non_snake_case)]

// Find all our documentation at https://docs.near.org
use near_sdk::env;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::NearSchema;
use near_sdk::{near, AccountId};
// Define the contract structure
#[near(contract_state)]
pub struct Contract {
    owner: AccountId,
    static_url: String,
}

// Define the default, which automatically initializes the contract
impl Default for Contract {
    fn default() -> Self {
        Self {
            owner: env::current_account_id(),
            static_url: "ipfs://bafybeidc4lvv4bld66h4rmy2jvgjdrgul5ub5s75vbqrcbjd3jeaqnyd5e"
                .to_string(),
        }
    }
}

#[near]
impl Contract {
    pub fn web4_setStaticUrl(&mut self, url: String) {
        self.assert_self_or_owner();
        if url.starts_with("ipfs:") {
            self.static_url = url;
        }
    }

    fn assert_self_or_owner(&self) {
        let caller = env::predecessor_account_id();
        assert!(
            caller == env::current_account_id() || caller == self.owner,
            "Caller is not authorized"
        );
    }

    pub fn web4_setOwner(&mut self, owner_id: AccountId) {
        self.assert_self_or_owner();
        self.owner = owner_id;
    }

    /// Learn more about web4 here: https://web4.near.page
    pub fn web4_get(&self, request: Web4Request) -> Web4Response {
        // Check if the path is empty or contains invalid characters
        let path = if let Some(p) = request.path.as_str().strip_prefix('/') {
            p
        } else {
            request.path.as_str()
        };

        // If the path is empty or just "/", return the static URL
        if path.is_empty() {
            return Web4Response::BodyUrl {
                body_url: self.static_url.clone(),
                status: 200,
            };
        }

        // List of file extensions to check
        let extensions = vec![
            ".css", ".js", ".html", ".png", ".jpg", ".jpeg", ".gif", ".svg",
        ];

        // Check if the path ends with one of the specified extensions
        let should_append_path = extensions.iter().any(|ext| path.ends_with(ext));

        if should_append_path {
            let appended_url = format!("{}/{}", self.static_url, path);
            return Web4Response::BodyUrl {
                body_url: appended_url,
                status: 200,
            };
        }

        // Default to returning the static URL if no specific extension is matched
        Web4Response::BodyUrl {
            body_url: self.static_url.clone(),
            status: 200,
        }
    }
}

#[derive(Debug, Serialize, Deserialize, NearSchema)]
#[serde(crate = "near_sdk::serde")]
pub struct Web4Request {
    #[serde(rename = "accountId")]
    pub account_id: Option<String>,
    pub path: String,
    #[serde(default)]
    pub params: std::collections::HashMap<String, String>,
    #[serde(default)]
    pub query: std::collections::HashMap<String, Vec<String>>,
    pub preloads: Option<std::collections::HashMap<String, Web4Response>>,
}

#[derive(Debug, Serialize, Deserialize, NearSchema, Clone)]
#[serde(crate = "near_sdk::serde", untagged)]
pub enum Web4Response {
    Body {
        #[serde(rename = "contentType")]
        content_type: String,
        body: String,
    },
    BodyUrl {
        #[serde(rename = "bodyUrl")]
        body_url: String,
        status: u16,
    },
    PreloadUrls {
        #[serde(rename = "preloadUrls")]
        preload_urls: Vec<String>,
    },
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 */
#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests {
    use super::*;

    use near_sdk::{test_utils::VMContextBuilder, testing_env};

    fn view_test_env() {
        let contract: String = "anybody.near".to_string();
        let context = VMContextBuilder::new()
            .current_account_id(contract.clone().try_into().unwrap())
            .predecessor_account_id(contract.clone().try_into().unwrap())
            .build();

        testing_env!(context);
    }

    fn set_caller(caller: &str) {
        let context = VMContextBuilder::new()
            .predecessor_account_id(caller.to_string().try_into().unwrap())
            .build();
        testing_env!(context);
    }

    #[test]
    fn test_web4_set_static_url() {
        view_test_env();
        let mut contract = Contract::default();

        // Set a new static URL
        contract.web4_setStaticUrl("ipfs://newhash".to_string());
        assert_eq!(contract.static_url, "ipfs://newhash");

        // Set an invalid static URL (should not change)
        contract.web4_setStaticUrl("http://notipfs".to_string());
        assert_eq!(contract.static_url, "ipfs://newhash");
    }

    #[test]
    fn test_web4_set_owner() {
        view_test_env();
        let mut contract = Contract::default();
        let new_owner = "new_owner.near".to_string();

        // Set a new owner
        contract.web4_setOwner(new_owner.clone().try_into().unwrap());
        assert_eq!(contract.owner, new_owner);
    }

    #[test]
    #[should_panic(expected = "Caller is not authorized")]
    fn test_web4_set_static_url_not_authorized() {
        view_test_env();
        let mut contract = Contract::default();

        // Change the caller to someone other than the owner or the contract itself
        set_caller("unauthorized.near");

        // Attempt to set a new static URL (should panic)
        contract.web4_setStaticUrl("ipfs://newhash".to_string());
    }

    #[test]
    #[should_panic(expected = "Caller is not authorized")]
    fn test_web4_set_owner_not_authorized() {
        view_test_env();
        let mut contract = Contract::default();
        let new_owner = "new_owner.near".to_string();

        // Change the caller to someone other than the owner or the contract itself
        set_caller("unauthorized.near");

        // Attempt to set a new owner (should panic)
        contract.web4_setOwner(new_owner.clone().try_into().unwrap());
    }

    #[test]
    fn test_web4_get_root() {
        view_test_env();
        let contract = Contract::default();

        let request = Web4Request {
            account_id: None,
            path: "/".to_string(),
            params: Default::default(),
            query: Default::default(),
            preloads: None,
        };

        let response = contract.web4_get(request);
        match response {
            Web4Response::BodyUrl { body_url, status } => {
                assert_eq!(body_url, contract.static_url);
                assert_eq!(status, 200);
            }
            _ => panic!("Unexpected response type"),
        }
    }

    #[test]
    fn test_web4_get_with_extension() {
        view_test_env();
        let contract = Contract::default();

        let request = Web4Request {
            account_id: None,
            path: "/styles.css".to_string(),
            params: Default::default(),
            query: Default::default(),
            preloads: None,
        };

        let response = contract.web4_get(request);
        match response {
            Web4Response::BodyUrl { body_url, status } => {
                assert_eq!(body_url, format!("{}/styles.css", contract.static_url));
                assert_eq!(status, 200);
            }
            _ => panic!("Unexpected response type"),
        }
    }

    #[test]
    fn test_web4_get_without_extension() {
        view_test_env();
        let contract = Contract::default();

        let request = Web4Request {
            account_id: None,
            path: "/noextension".to_string(),
            params: Default::default(),
            query: Default::default(),
            preloads: None,
        };

        let response = contract.web4_get(request);
        match response {
            Web4Response::BodyUrl { body_url, status } => {
                assert_eq!(body_url, contract.static_url);
                assert_eq!(status, 200);
            }
            _ => panic!("Unexpected response type"),
        }
    }

    #[test]
    fn test_web4_get_invalid_path() {
        view_test_env();
        let contract = Contract::default();

        let request = Web4Request {
            account_id: None,
            path: "".to_string(),
            params: Default::default(),
            query: Default::default(),
            preloads: None,
        };

        let response = contract.web4_get(request);
        match response {
            Web4Response::BodyUrl { body_url, status } => {
                assert_eq!(body_url, contract.static_url);
                assert_eq!(status, 200);
            }
            _ => panic!("Unexpected response type"),
        }
    }
}
