const { Modal, Button, ProgressState } = VM.require(
  "${config_account}/widget/components",
) || {
  Modal: () => <></>,
  Button: () => <></>,
  ProgressState: () => <></>,
};

const { normalize } = VM.require("${alias_devs}/widget/lib.stringUtils") || {
  normalize: () => {},
};

const { getProjectMeta } = VM.require(
  "${config_account}/widget/lib.project-data",
) || {
  getProjectMeta: () => {},
};

const { id } = props;

const project = getProjectMeta(id);
const app = props.app || "${config_account}";
const type = props.type || "task";
const projectTask = "project-task";

const ThemeContainer =
  props.ThemeContainer ||
  styled.div`
    --primary-color: rgb(255, 175, 81);
    --border-color: rgba(255, 255, 255, 0.2);
    --font-color: #fff;
    --menu-bg-color: #0b0c14;
    --secondary-font-color: rgba(176, 176, 176, 1);
    --card-bg-color: rgba(35, 36, 43, 1);
  `;

const Wrapper = styled.div`
  color: white;

  .border {
    border-color: var(--border-color) !important;
  }
  input::placeholder {
    color: var(--secondary-font-color) !important;
  }

  .form-control {
    background: #23242b !important;
    color: #fff !important;
    border: 1px solid var(--border-color) !important;
  }

  .form-check-input:checked {
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
  }

  .cbx:hover span:first-child {
    border-color: var(--primary-color) !important;
  }

  .pointer {
    cursor: pointer;
  }

  .red {
    color: #dc3545;
  }

  .badge {
    border: 1px solid var(--primary-color) !important;
  }

  .hashtag {
    color: var(--primary-color) !important;
  }

  .secondary-text {
    color: var(--secondary-font-color) !important;
  }

  .dropdown-menu {
    background-color: var(--menu-bg-color) !important;
    color: var(--font-color) !important;

    li.dropdown-item {
      display: flex;
      gap: 10px;
      align-items: center;
      cursor: pointer;
      color: var(--font-color) !important;
      &:hover {
        a {
          color: var(--menu-bg-color) !important;
        }
      }
    }

    .link-dark,
    .dropdown-item {
      color: var(--font-color) !important;

      &:hover {
        color: var(--menu-bg-color) !important;

        span {
          color: var(--menu-bg-color) !important;
        }
      }
    }

    .dropdown-item.active,
    .dropdown-item:active {
      background-color: var(--primary-color) !important;
    }
  }

  .container {
    border: none !important;
  }

  .assignee-item {
    display: inline-block;
    padding: 0.2em 0.4em;
    border-radius: 10px;
    border: 0.8px solid lightgray;
    position: relative;
  }

  .flex-1 {
    flex: 1;
  }
`;

const projectID = normalize(project?.title, "-");

const StatusValues = {
  PROPOSED: "proposed",
  PROGRESS: "progress",
  COMPLETED: "completed",
};

const listItem = { title: "", isCompleted: false };
const task = {
  title: "",
  description: "",
  author: context.accountId,
  tags: [],
  list: [], // listItem
  status: "",
  priority: "",
  assignees: [],
  startDate: "",
  endDate: "",
};

const [proposedTasks, setProposedTasks] = useState([]);
const [progressTasks, setProgresTasks] = useState([]);
const [completedTasks, setCompletedTasks] = useState([]);
const [showAddTaskModal, setShowAddTaskModal] = useState(false);
const [taskDetail, setTaskDetail] = useState({});
const [showDropdownIndex, setShowDropdownIndex] = useState(null);
const [isEditTask, setIsEdit] = useState(false);
const [showDeleteConfirmationModalIndex, setDeleteConfirmationIndex] =
  useState(null);
const [showViewTaskModal, setViewTaskModal] = useState(false);
const [currentEditTaskId, setCurrentTaskId] = useState(null); // if user change title we need the same earlier key to update the data

const isAllowedToEdit = (project.contributors ?? []).includes(
  context.accountId,
);

const flattenObject = (obj) => {
  let paths = [];

  try {
    Object.keys(obj).forEach((key) => {
      const projects = Object.keys(
        obj?.[key]?.[app]?.[projectTask]?.[projectID]?.[type] ?? {},
      );
      projects.map((path) => {
        if (!path || !path.includes("_")) {
          return;
        }
        const convertedStr = path.replace(/_/g, "/");
        paths.push(convertedStr);
      });
    });
  } catch (e) {}
  return paths;
};

const processData = useCallback(
  (data) => {
    const accounts = Object.entries(data ?? {});
    const allTasks = accounts
      .map((account) => {
        return Object.entries(account?.[1]?.[type] ?? {}).map((kv) => {
          const metadata = JSON.parse(kv[1]);
          return {
            ...metadata,
            oldTitle: kv[0],
          };
        });
      })
      .flat();
    return allTasks;
  },
  [type],
);

function fetchTasks() {
  if (!projectID) {
    return;
  }
  const keys = Social.keys(
    `*/${app}/${projectTask}/${projectID}/${type}/*`,
    "final",
    {
      order: "desc",
      subscribe: true,
    },
  );
  if (!keys) {
    return "Loading...";
  }
  let flattenedKeys = flattenObject(keys);

  const data = Social.get(flattenedKeys, "final");
  // check if task is singular (since we have to update the return format for parsing)
  const isSingular = flattenedKeys.length === 1;
  if (isSingular) {
    const [name, task, taskName] = flattenedKeys?.[0]?.split("/").slice(0, 3);
    return {
      [name]: {
        [task]: {
          [taskName]: data,
        },
      },
    };
  }
  return data;
}

const data = fetchTasks();
const tasks = processData(data);

function sortByPriority(a, b) {
  const priorityOrder = { P0: 0, P1: 1, P2: 2, P3: 3 };
  return priorityOrder[a.priority] - priorityOrder[b.priority];
}

useEffect(() => {
  if (Array.isArray(tasks)) {
    setProposedTasks(
      tasks
        .filter((i) => i.status === StatusValues.PROPOSED)
        .sort(sortByPriority),
    );
    setProgresTasks(
      tasks
        .filter((i) => i.status === StatusValues.PROGRESS)
        .sort(sortByPriority),
    );
    setCompletedTasks(
      tasks
        .filter((i) => i.status === StatusValues.COMPLETED)
        .sort(sortByPriority),
    );
  }
}, [tasks]);

const updateTaskDetail = (data) => {
  setTaskDetail((prevState) => ({
    ...prevState,
    ...data,
  }));
};

const updateTaskListItem = (index, updatedItem) => {
  const updatedList = [...taskDetail.list];
  updatedList[index] = updatedItem;
  updateTaskDetail({ list: updatedList });
};

const deleteTaskListItem = (index) => {
  const updatedList = [
    ...taskDetail.list.slice(0, index),
    ...taskDetail.list.slice(index + 1),
  ];
  updateTaskDetail({ list: updatedList });
};

const onAddTask = () => {
  const taskId = normalize(taskDetail.title, "-");
  const data = {
    [type]: {
      [taskId]: {
        "": JSON.stringify(taskDetail),
        metadata: taskDetail,
      },
    },
    [app]: {
      [projectTask]: {
        [projectID]: {
          [type]: {
            [`${context.accountId}_task_${taskId}`]: "",
          },
        },
      },
    },
  };
  Social.set(data, {
    onCommit: () => setShowAddTaskModal(false),
  });
};

const onEditTask = useCallback(
  (data) => {
    const newData = data ?? taskDetail;
    const taskId = currentEditTaskId;
    const updatedData = {
      [type]: {
        [taskId]: {
          "": JSON.stringify(newData),
          metadata: newData,
        },
      },
      [app]: {
        [projectTask]: {
          [projectID]: {
            [type]: {
              [`${context.accountId}_task_${taskId}`]: "",
            },
          },
        },
      },
    };
    Social.set(updatedData, {
      force: true,
      onCommit: () => setShowAddTaskModal(false),
    });
  },
  [taskDetail, currentEditTaskId],
);

const onDeleteTask = useCallback(() => {
  const taskId = currentEditTaskId;
  const updatedData = {
    [type]: {
      [taskId]: null,
    },
    [app]: {
      [projectTask]: {
        [projectID]: {
          [type]: {
            [`${context.accountId}_task_${taskId}`]: null,
          },
        },
      },
    },
  };
  Social.set(updatedData, {
    force: true,
  });
}, [taskDetail, currentEditTaskId]);

function handleDropdownToggle(columnTitle, index, value) {
  setShowDropdownIndex((prevState) => ({
    ...prevState,
    [columnTitle + index]: value ?? !prevState[columnTitle + index] ?? true,
  }));
}

const DropdownMenu = ({ columnTitle, item, index, changeStatusOptions }) => {
  return (
    <span
      className="ms-auto flex-shrink-0"
      onClick={(event) => event.stopPropagation()}
      tabIndex="0"
      onBlur={() => handleDropdownToggle(columnTitle, index, false)}
    >
      <div
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={() => {
          handleDropdownToggle(columnTitle, index);
          setTaskDetail(item);
          setCurrentTaskId(normalize(item.oldTitle));
        }}
      >
        <i class="bi bi-three-dots h5 pointer"></i>
      </div>
      {showDropdownIndex[columnTitle + index] && (
        <ul className="dropdown-menu show border">
          <li
            className="dropdown-item"
            onClick={() => {
              handleDropdownToggle(columnTitle, index);
              setIsEdit(true);
              setShowAddTaskModal(true);
            }}
          >
            <i class="bi bi-pencil"></i>Edit Task
          </li>
          <li
            className="dropdown-item"
            onClick={() => {
              handleDropdownToggle(columnTitle, index);
              setDeleteConfirmationIndex(index);
            }}
          >
            <i class="bi bi-trash3"></i>Delete Task
          </li>
          {(changeStatusOptions ?? []).length > 0 && (
            <div>
              <hr />
              <div
                style={{ color: "var(--secondary-font-color)" }}
                className="px-2 mb-1"
              >
                Change Status
              </div>
              {changeStatusOptions.map((i) => (
                <li
                  className="dropdown-item"
                  onClick={() => {
                    const data = { status: i.value };
                    updateTaskDetail(data);
                    handleDropdownToggle(columnTitle, index);
                    onEditTask({ ...taskDetail, ...data });
                  }}
                >
                  <i class="bi bi-check2"></i>
                  {i.label}
                </li>
              ))}
            </div>
          )}
        </ul>
      )}
    </span>
  );
};

const DeleteConfirmationModal = () => {
  return (
    <Modal
      open={typeof showDeleteConfirmationModalIndex === "number"}
      title={"Delete Task"}
      onOpenChange={() => setDeleteConfirmationIndex(null)}
    >
      <div className="d-flex flex-column gap-2">
        Are you sure you want to delete the task ?
        <div className="d-flex justify-content-end gap-3 align-items-center mt-3">
          <Button
            variant="outline"
            onClick={() => setDeleteConfirmationIndex(null)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setDeleteConfirmationIndex(null);
              onDeleteTask();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const today = new Date().toISOString().split("T")[0];

const AddTaskModal = () => {
  return (
    <Modal
      open={showAddTaskModal}
      title={(isEditTask ? "Edit" : "Add") + " Task"}
      onOpenChange={() => {
        setShowAddTaskModal(!showAddTaskModal);
        setTaskDetail(null);
      }}
    >
      <div className="d-flex flex-column gap-4">
        <div>
          <label class="mb-1">Title</label>
          <input
            placeholder="Enter task title"
            type="text"
            value={taskDetail?.title ?? ""}
            onChange={(e) => updateTaskDetail({ title: e.target.value })}
          />
        </div>
        <div>
          <label class="mb-1">Description</label>
          <input
            placeholder="Enter description"
            type="text"
            value={taskDetail?.description ?? ""}
            onChange={(e) => updateTaskDetail({ description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label class="mb-1">Priority</label>
          <select
            name="proposal-type"
            id="proposal-type"
            data-bs-theme={"dark"}
            class="form-select"
            onChange={(e) => updateTaskDetail({ priority: e.target.value })}
            value={taskDetail.priority}
          >
            <option selected value="">
              Select
            </option>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
          </select>
        </div>
        <div className="form-group">
          <label class="mb-1">Assignee/s</label>
          <Typeahead
            multiple
            options={project.contributors}
            allowNew
            placeholder="Add task assignee"
            selected={taskDetail?.assignees ?? []}
            onChange={(e) => {
              const data = e.map((i) => (i.label ? i.label : i));
              updateTaskDetail({ assignees: data });
            }}
          />
        </div>
        <div className="form-group">
          <label class="mb-1">Labels</label>
          <Typeahead
            multiple
            options={project.tags}
            allowNew
            placeholder="Add labels"
            selected={taskDetail?.tags ?? []}
            onChange={(e) => {
              const data = e.map((i) => (i.label ? i.label : i));
              updateTaskDetail({ tags: data });
            }}
          />
        </div>
        <div className="d-flex gap-2">
          <div className="form-group flex-1">
            <label>Start Date</label>
            <input
              placeholder="Enter start date"
              min={today}
              type="date"
              value={taskDetail?.startDate ?? ""}
              onChange={(e) => updateTaskDetail({ startDate: e.target.value })}
            />
          </div>

          <div className="form-group flex-1">
            <label>End Date</label>
            <input
              placeholder="Enter end date"
              type="date"
              min={today}
              value={taskDetail?.endDate ?? ""}
              onChange={(e) => updateTaskDetail({ endDate: e.target.value })}
            />
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between mb-1 align-items-center">
            <label>Task List</label>
            <div
              onClick={() =>
                updateTaskDetail({
                  list: [...(taskDetail.list ?? []), { ...listItem }],
                })
              }
            >
              <i class="bi bi-plus-circle h5 pointer"></i>
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            {Array.isArray(taskDetail.list) &&
              taskDetail.list?.map((item, index) => (
                <div>
                  <div className="d-flex gap-2 justify-content-between align-items-center">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      disabled={!isAllowedToEdit}
                      checked={item.isCompleted}
                      onChange={(e) =>
                        updateTaskListItem(index, {
                          title: item.title,
                          isCompleted: e.target.checked,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={item.title}
                      placeholder="Task Detail"
                      onChange={(e) =>
                        updateTaskListItem(index, {
                          title: e.target.value,
                          isCompleted: false,
                        })
                      }
                    />
                    <div onClick={() => deleteTaskListItem(index)}>
                      <i class="bi bi-trash3 h6 red pointer"></i>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="d-flex justify-content-end gap-3 align-items-center mt-3">
          {!isEditTask && (
            <Button variant="outline" onClick={() => setTaskDetail(null)}>
              Clear Inputs
            </Button>
          )}
          <Button
            variant="primary"
            onClick={isEditTask ? () => onEditTask() : onAddTask}
          >
            {isEditTask ? "Save" : "Add Task"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

function formatDate(date) {
  return date;
}

const ViewTaskModal = () => {
  return (
    <Modal
      open={showViewTaskModal}
      title={"Task Details"}
      onOpenChange={() => {
        setViewTaskModal(!showViewTaskModal);
        setTaskDetail(null);
      }}
    >
      <div className="d-flex flex-column gap-4">
        <div>
          <label class="mb-1">Title</label>
          <div className="secondary-text">{taskDetail.title}</div>
        </div>
        <div>
          <label class="mb-1">Description</label>
          <div className="secondary-text">{taskDetail.description}</div>
        </div>
        <div>
          <label class="mb-1">Priority</label>
          <div className="secondary-text">{taskDetail.priority ?? "None"}</div>
        </div>
        <div>
          <label class="mb-1">Assignee</label>
          <div className="d-flex gap-2 align-items-center">
            {Array.isArray(taskDetail.assignees) &&
              taskDetail.assignees.map((assignee) => (
                <div className="assignee-item" key={index}>
                  <Widget
                    src={
                      "${config_account}/widget/components.project.ProfileCard"
                    }
                    props={{
                      accountId: assignee,
                      openLinkInNewTab: true,
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
        <div>
          <label class="mb-1">Labels</label>
          <div className="d-flex gap-2 align-items-center">
            {Array.isArray(taskDetail.tags) &&
              taskDetail.tags.map((tag) => (
                <span key={i} className="badge p-2 rounded-0">
                  <span className="hashtag">#</span>
                  {tag}
                </span>
              ))}
          </div>
        </div>
        <div className="d-flex gap-4 align-items-center">
          <div>
            <label>Start Date</label>
            <div className="secondary-text">
              {formatDate(taskDetail.startDate)}
            </div>
          </div>

          <div>
            <label>End Date</label>
            <div className="secondary-text">
              {formatDate(taskDetail.endDate)}
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between mb-1 align-items-center">
            <label>Task List</label>
          </div>
          <div className="d-flex flex-column gap-2">
            {Array.isArray(taskDetail.list) &&
              taskDetail.list?.map((item) => (
                <div>
                  <div className="d-flex gap-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={item.isCompleted}
                      disabled={true}
                    />
                    <label>{item.title}</label>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const Column = ({ title, addTask, columnTasks, changeStatusOptions }) => {
  return (
    <div className="d-flex flex-column gap-1 col-md-4">
      <div className="border p-3 rounded-2 d-flex justify-content-between align-items-center h6">
        {title}
        {isAllowedToEdit && (
          <div onClick={addTask}>
            <i class="bi bi-plus-lg pointer"></i>
          </div>
        )}
      </div>
      <div className="d-flex flex-column gap-2">
        {columnTasks.map((item, index) => (
          <div
            onClick={() => {
              setViewTaskModal(true);
              setTaskDetail(item);
            }}
            style={{ backgroundColor: "var(--card-bg-color)" }}
            className="p-3 d-flex justify-content-between rounded-2 gap-2 pointer"
          >
            <div className="d-flex flex-column gap-2">
              <div className="h6 bold">{item.title}</div>
              <div className="h6">Author: {item.author}</div>
              <div className="h6">Priority: {item.priority}</div>
              {/* <div className="h6">Last edited: </div> */}
            </div>
            {isAllowedToEdit && (
              <DropdownMenu
                columnTitle={title}
                item={item}
                index={index}
                changeStatusOptions={changeStatusOptions}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const columns = [
  {
    title: "Proposed",
    columnTasks: proposedTasks,
    addTask: () => {
      setTaskDetail({ ...task, status: StatusValues.PROPOSED });
      setShowAddTaskModal(true);
    },
    changeStatusOptions: [
      { label: "In Progress", value: StatusValues.PROGRESS },
    ],
  },
  {
    title: "In Progress",
    columnTasks: progressTasks,
    addTask: () => {
      setTaskDetail({ ...task, status: StatusValues.PROGRESS });
      setShowAddTaskModal(true);
    },
    changeStatusOptions: [
      { label: "Completed", value: StatusValues.COMPLETED },
    ],
  },
  {
    title: "Completed",
    columnTasks: completedTasks,
    addTask: () => {
      setTaskDetail({ ...task, status: StatusValues.COMPLETED });
      setShowAddTaskModal(true);
    },
    changeStatusOptions: [],
  },
];

return (
  <ThemeContainer>
    <Wrapper>
      <AddTaskModal />
      <ViewTaskModal />
      <DeleteConfirmationModal />
      <div className="container">
        <div className="row">
          {columns.map((item) => (
            <Column
              title={item.title}
              addTask={item.addTask}
              columnTasks={item.columnTasks}
              changeStatusOptions={item.changeStatusOptions}
            />
          ))}
        </div>
      </div>
    </Wrapper>
  </ThemeContainer>
);
