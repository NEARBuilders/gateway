// Find all our documentation at https://docs.near.org
use near_sdk::near;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::NearSchema;
use near_sdk::{
    base64::{
        alphabet,
        engine::{self, general_purpose},
        Engine,
    },
    env,
};
use serde_json::json;

// Define the contract structure
#[near(contract_state)]
pub struct Contract {}

// Define the default, which automatically initializes the contract
impl Default for Contract {
    fn default() -> Self {
        Self {}
    }
}

#[near]
impl Contract {
    pub const BASE64_ENGINE: engine::GeneralPurpose =
        engine::GeneralPurpose::new(&alphabet::URL_SAFE, general_purpose::PAD);

    /// Learn more about web4 here: https://web4.near.page
    pub fn web4_get(&self, request: Web4Request) -> Web4Response {
        let mut current_account_id = env::current_account_id().to_string();

        // Check if current_account_id starts with "web4." and remove it if it does
        if let Some(stripped) = current_account_id.strip_prefix("web4.") {
            current_account_id = stripped.to_string();
        }

        let path_parts: Vec<&str> = request.path.split('/').collect();

        let metadata_preload_url = format!(
            // web4 contract call for widget metadata
            "/web4/contract/social.near/get?keys.json=%5B%22{}/widget/Index/metadata/**%22%5D",
            &current_account_id
        );

        let mut app_name = String::new();
        let title = String::new();
        let mut description = String::new();

        let Some(preloads) = request.preloads else {
            return Web4Response::PreloadUrls {
                preload_urls: [metadata_preload_url.clone()].to_vec(),
            };
        };

        // populate title and description from widget metadata
        if let Some(Web4Response::Body {
            content_type: _,
            body,
        }) = preloads.get(&metadata_preload_url)
        {
            if let Ok(body_value) = serde_json::from_slice::<serde_json::Value>(
                &Self::BASE64_ENGINE.decode(body).unwrap(),
            ) {
                if let Some(app_name_str) =
                    body_value[&current_account_id]["widget"]["Index"]["metadata"]["name"].as_str()
                {
                    app_name = app_name_str.to_string();
                }

                if let Some(description_str) = body_value[&current_account_id]["widget"]["Index"]
                    ["metadata"]["description"]
                    .as_str()
                {
                    description = description_str.to_string();
                }
            }
        }

        let image = format!(
            "https://i.near.social/magic/large/https://near.social/magic/img/account/{}",
            &current_account_id
        );
        let redirect_path;
        let initial_props_json;

        redirect_path = format!("{}/widget/Index", &current_account_id);
        initial_props_json = json!({"page": path_parts.get(2)});

        let app_name = html_escape::encode_text(&app_name).to_string();
        let title = html_escape::encode_text(&title).to_string();
        let description = html_escape::encode_text(&description).to_string();

        let body = format!(
            r#"<!DOCTYPE html>
    <html>
    <head>
        <title>{title}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta property="og:url" content="{url}" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="{app_name}{title}" />
        <meta property="og:description" content="{description}" />
        <meta property="og:image" content="{image}" />
    
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{app_name}{title}">
        <meta name="twitter:description" content="{description}">
        <meta name="twitter:image" content="{image}">
        <script src="https://ipfs.web4.near.page/ipfs/bafybeiancp5im5nfkdki3cfvo7ownl2knjovqh7bseegk4zvzsl4buryoi/main.e3d28e0d8977da89f0c4.bundle.js"></script>
        <script src="https://ipfs.web4.near.page/ipfs/bafybeiancp5im5nfkdki3cfvo7ownl2knjovqh7bseegk4zvzsl4buryoi/runtime.475541d9ed47b876d02e.bundle.js"></script>
    </head>
    <body>
        <near-social-viewer src="{current_account_id}/widget/Index" initialProps='{initial_props_json}'></near-social-viewer>
    </body>
    </html>"#,
            url = redirect_path
        );

        Web4Response::Body {
            content_type: "text/html; charset=UTF-8".to_owned(),
            body: Self::BASE64_ENGINE.encode(body),
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

    use near_sdk::{base64::Engine, test_utils::VMContextBuilder, testing_env};

    const PRELOAD_URL: &str =
        "/web4/contract/social.near/get?keys.json=%5B%22anybody.near/widget/Index/metadata/**%22%5D";

    fn create_preload_result(title: String, description: String) -> serde_json::Value {
        let body_string = serde_json::json!({"anybody.near":{"widget":{"Index":{"metadata":{
        "description":description,
        "image":{"ipfs_cid":"bafkreido4srg4aj7l7yg2tz22nbu3ytdidjczdvottfr5ek6gqorwg6v74"},
        "name":title
        }}}}})
        .to_string();

        let body_base64 = Contract::BASE64_ENGINE.encode(body_string);
        return serde_json::json!({
                String::from(PRELOAD_URL): {
                    "contentType": "application/json",
                    "body": body_base64
                }
        });
    }

    fn view_test_env() {
        let contract: String = "anybody.near".to_string();
        let context = VMContextBuilder::new()
            .current_account_id(contract.try_into().unwrap())
            .build();

        testing_env!(context);
    }

    #[test]
    pub fn test_preload_url_response() {
        view_test_env();
        let contract = Contract {};

        let response_before_preload = contract.web4_get(
            serde_json::from_value(serde_json::json!({
                "path": "/"
            }))
            .unwrap(),
        );
        match response_before_preload {
            Web4Response::PreloadUrls { preload_urls } => {
                assert_eq!(PRELOAD_URL, preload_urls.get(0).unwrap())
            }
            _ => {
                panic!("Should return Web4Response::PreloadUrls");
            }
        }
    }

    #[test]
    pub fn test_response_with_preload_content() {
        view_test_env();
        let contract = Contract {};

        let response = contract.web4_get(
            serde_json::from_value(serde_json::json!({
                "path": "/",
                "preloads": create_preload_result(String::from("Anybody"),String::from("A description of any widget")),
            }))
            .unwrap(),
        );
        match response {
            Web4Response::Body { content_type, body } => {
                assert_eq!("text/html; charset=UTF-8", content_type);

                let body_string =
                    String::from_utf8(Contract::BASE64_ENGINE.decode(body).unwrap()).unwrap();

                assert!(body_string.contains(
                    "<meta property=\"og:description\" content=\"A description of any widget\" />"
                ));
                assert!(body_string.contains("<meta property=\"og:title\" content=\"Anybody\" />"));
            }
            _ => {
                panic!("Should return Web4Response::Body");
            }
        }
    }

    #[test]
    pub fn test_web4_path() {
        view_test_env();
        let contract = Contract {};

        for unknown_path in &["/", "/unknown", "/unknown/path"] {
            let response = contract.web4_get(
                serde_json::from_value(serde_json::json!({
                    "path": unknown_path,
                    "preloads": create_preload_result(String::from("Anything"), String::from("Anywhere")),
                }))
                .unwrap(),
            );
            match response {
                Web4Response::Body { content_type, body } => {
                    assert_eq!("text/html; charset=UTF-8", content_type);

                    let body_string =
                        String::from_utf8(Contract::BASE64_ENGINE.decode(body).unwrap()).unwrap();

                    assert!(body_string
                        .contains("<meta name=\"twitter:description\" content=\"Anywhere\">"));
                    assert!(
                        body_string.contains("<meta name=\"twitter:title\" content=\"Anything\">")
                    );
                }
                _ => {
                    panic!(
                        "Should return Web4Response::Body for '{}' path",
                        unknown_path
                    );
                }
            }
        }
    }
}
