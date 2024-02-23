const { Modal, Button, ProgressState } = VM.require(
  "buildhub.near/widget/components"
) || {
  Modal: () => <></>,
  Button: () => <></>,
  ProgressState: () => <></>
};

const StatusValues = {
  PROPOSED: "proposed",
  PROGRESS: "progress",
  COMPLETED: "completed"
};

const listItem = { title: "", isCompleted: false };
const task = { title: "", description: "", author: "", tags: "", list: [] };

const [tasks, setTasks] = useState([]);
const [showTaskModal, setShowTaskModal] = useState(false);
const [taskDetail, setTaskDetail] = useState({});

const onEdit = () => {
  const modifications = Social.index("modify", item, {
    limit: 1,
    order: "desc"
  });

  if (modifications.length) {
    const modification = modifications[0].value;
    if (modification.type === "edit") {
      content = modification.value;
      console.log("content", content);
    } else if (modification.type === "delete") {
      return <></>;
    }
  }
};

const updateTaskDetail = (data) => {
  setTaskDetail((prevState) => ({
    ...prevState,
    ...data
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
    ...taskDetail.list.slice(index + 1)
  ];
  updateTaskDetail({ list: updatedList });
};

const TaskModal = () => {
  return (
    <Modal
      open={showTaskModal}
      title={"Add Task"}
      onOpenChange={() => setShowTaskModal(!showTaskModal)}
    >
      <div className="d-flex flex-column gap-4">
        <div>
          <label class="mb-1">Title</label>
          <input
            type="text"
            value={taskDetail.title}
            onChange={(e) => updateTaskDetail({ title: e.target.value })}
          />
        </div>
        <div>
          <label class="mb-1">Description</label>
          <input
            type="text"
            value={taskDetail.description}
            onChange={(e) => updateTaskDetail({ description: e.target.value })}
          />
        </div>
        <div>
          <label class="mb-1">Tags</label>
          <input
            type="text"
            value={taskDetail.tags}
            onChange={(e) => updateTaskDetail({ tags: e.target.value })}
          />
        </div>
        <div>
          <div className="d-flex justify-content-between mb-1 align-items-center">
            <label>Task List</label>
            <div
              onClick={() =>
                updateTaskDetail({
                  list: [...(taskDetail.list ?? []), { ...listItem }]
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
                  {taskDetail.status === StatusValues.PROGRESS && (
                    <div className="d-flex gap-2">
                      <label>{item.title}</label>
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={(e) =>
                          updateTaskListItem(index, {
                            title: item.title,
                            isCompleted: e.target.checked
                          })
                        }
                      />
                    </div>
                  )}
                  {taskDetail.status === StatusValues.PROPOSED && (
                    <div className="d-flex gap-2 justify-content-between align-items-center">
                      <input
                        type="text"
                        value={item.title}
                        placeholder="Task name"
                        onChange={(e) =>
                          updateTaskListItem(index, {
                            title: e.target.value,
                            isCompleted: false
                          })
                        }
                      />
                      <div onClick={() => deleteTaskListItem(index)}>
                        <i class="bi bi-trash3 h6 red pointer"></i>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="d-flex justify-content-end gap-3 align-items-center mt-3">
          <Button variant="outline" onClick={() => setTaskDetail(null)}>
            Clear Inputs
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Add Task
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const Column = ({ title, addTask, tasks }) => {
  return (
    <div className="d-flex flex-column gap-1 col-md-4">
      <div className="border p-3 rounded-2 d-flex justify-content-between align-items-center h6">
        {title}
        <div onClick={addTask}>
          <i class="bi bi-plus-lg pointer"></i>
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        {tasks.map((item) => (
          <div></div>
        ))}
      </div>
    </div>
  );
};

const columns = [
  {
    title: "Proposed",
    tasks: [],
    addTask: () => {
      setTaskDetail({ ...task, status: StatusValues.PROPOSED });
      setShowTaskModal(true);
    }
  },
  {
    title: "In Progress",
    tasks: [],
    addTask: () => {
      setTaskDetail({ ...task, status: StatusValues.PROGRESS });
      setShowTaskModal(true);
    }
  },
  {
    title: "Completed",
    tasks: [],
    addTask: () => {
      setTaskDetail({ ...task, status: StatusValues.COMPLETED });
      setShowTaskModal(true);
    }
  }
];

const Wrapper = styled.div`
  color: white;

  .border {
    border-color: var(--stroke-color, rgba(255, 255, 255, 0.2)) !important;
  }
  input::placeholder {
    color: #fff !important;
  }

  input {
    background: #23242b !important;
    color: #fff !important;
    border: 1px solid var(--stroke-color, rgba(255, 255, 255, 0.2)) !important;
  }

  .pointer {
    cursor: pointer;
  }

  .red {
    color: #dc3545;
  }
`;

return (
  <Wrapper>
    <TaskModal />
    <div class="container">
      <div class="row">
        {columns.map((item) => (
          <Column
            title={item.title}
            addTask={item.addTask}
            tasks={item.tasks}
          />
        ))}
      </div>
    </div>
  </Wrapper>
);
