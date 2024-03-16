import Input from "./Input.jsx";
import Modal from "./Modal.jsx";
import { useRef } from "react";

export default function NewProject({ handleAddProject, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    handleAddProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption={'Okay'}>
        <h2 className="text-xl font-bold text-stone-700 my-4">Please make sure to enter valid input in all the fields</h2>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-start-950 hover:underline" onClick={onCancel}>
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} textArea={false} label="Title" />
          <Input ref={description} textArea={true} label="Description" />
          <Input type="date" ref={dueDate} textArea={false} label="Due Date" />
        </div>
      </div>
    </>
  );
}
