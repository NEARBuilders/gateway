const { Modal, Button, ProgressState } = VM.require(
  "${alias_old}/widget/components",
) || {
  Modal: () => <></>,
  Button: () => <></>,
  ProgressState: () => <></>,
};

const listItem = { title: "", isCompleted: false };
const showAddTaskModal = props.showAddTaskModal;
const setShowAddTaskModal = props.setShowAddTaskModal;
const task = props.task;
const onEditTask = props.onEditTask;
const onAddTask = props.onAddTask;
const project = props.project;

const [taskDetail, setTaskDetail] = useState(task);

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

return (
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
                  disabled={!taskDetail.isAllowedToEdit}
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
        onClick={() =>
          isEditTask ? onEditTask(taskDetail) : onAddTask(taskDetail)
        }
      >
        {isEditTask ? "Save" : "Add Task"}
      </Button>
    </div>
  </div>
);
