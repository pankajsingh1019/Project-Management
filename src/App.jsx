import NewProject from "./components/NewProject";
import ProjectSidebar from "./components/ProjectSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
import { useState } from "react";

function App() {
  const [projectState, setSelectedProject] = useState({
    selectedProjectID: undefined, //This is like we are using number to identify the status of the view we want. undefined=noProjects, null=clickedButton
    projects: [],
  });

  function handleStartProject() {
    setSelectedProject((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectID: null,
      };
    });
  }

  function handleSelectedProject(id) {
    setSelectedProject((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectID: id,
      };
    });
  }

  function cancelProject() {
    setSelectedProject((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectID: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: Math.random(),
    };

    setSelectedProject((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectID: undefined,
        projects: [...prevProjectState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    //For this function when don't need the Id of the selected task, because the previous state already has it when we first clicked on the task
    setSelectedProject((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectID: undefined,
        projects: prevProjectState.projects.filter(
          (project) => project.id !== prevProjectState.selectedProjectID
        ), //the filter method will remove an element if the value is false and keep the element if it is true
      };
    });
  }

  function handleAddTask(task) {
    setSelectedProject((prevProjectState) => {
      const updatedProjects = prevProjectState.projects.map((project) => {
        if (project.id === prevProjectState.selectedProjectID) {
          const newTask = {
            task: task,
            id: Math.random(),
          };
          const updatedTasks = project.tasks
            ? [...project.tasks, newTask]
            : [newTask];
          return { ...project, tasks: updatedTasks };
        }
        return project;
      });

      return {
        ...prevProjectState,
        projects: updatedProjects,
      };
    });
  }

  function handleDeleteTask(taskId) {
    setSelectedProject((prevProjectState) => {
      const updatedProjects = prevProjectState.projects.map((project) => {
        const updatedTasks = project.tasks.filter((task) => task.id !== taskId);
        return { ...project, tasks: updatedTasks };
      });

      return {
        ...prevProjectState,
        projects: updatedProjects,
      };
    });
  }

  console.log(projectState);

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectID
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />
  );

  if (projectState.selectedProjectID === undefined) {
    content = <NoProjectSelected selectedProjectButton={handleStartProject} />;
  } else if (projectState.selectedProjectID === null) {
    content = (
      <NewProject
        handleAddProject={handleAddProject}
        onCancel={cancelProject}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        selectedProjectButton={handleStartProject}
        selectedProject={handleSelectedProject}
        projectsData={projectState}
      />
      {content}
    </main>
  );
}

export default App;
