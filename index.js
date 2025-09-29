import fs from "node:fs/promises";
import { program } from "commander";
import chalk from "chalk";

const taskFile = "./tasks.json";

async function checkAndCreateFile() {
  try {
    await fs.access(taskFile);
  } catch {
    console.log(chalk.yellow("File not found. Creating new tasks file..."));
    await fs.writeFile(taskFile, JSON.stringify([]), "utf-8");
    console.log(chalk.green("File created successfully!"));
  }
}

async function loadTasks() {
  const data = await fs.readFile(taskFile, "utf-8");
  return JSON.parse(data);
}

async function saveTasks(tasks) {
  await fs.writeFile(taskFile, JSON.stringify(tasks, null, 2), "utf-8");
}

async function addTask(task) {
  const tasks = await loadTasks();
  const newTask = { id: tasks.length + 1, task, status: "todo" };
  tasks.push(newTask);
  await saveTasks(tasks);
  console.log(
    chalk.green(`Task added successfully: ${JSON.stringify(newTask)}`)
  );
}

async function updateTask(id, newTask) {
  const tasks = await loadTasks();
  const taskIndex = Number(id) - 1;

  if (!tasks[taskIndex]) {
    console.log(chalk.red(`Task with ID ${id} not found.`));
    return;
  }

  tasks[taskIndex].task = newTask;
  await saveTasks(tasks);
  console.log(
    chalk.green(
      `Task updated successfully: ${JSON.stringify(tasks[taskIndex])}`
    )
  );
}

async function deleteTask(id) {
  const tasks = await loadTasks();
  const taskIndex = Number(id) - 1;

  if (!tasks[taskIndex]) {
    console.log(chalk.red(`Task with ID ${id} not found.`));
    return;
  }

  tasks.splice(taskIndex, 1);
  tasks.forEach((t, index) => (t.id = index + 1));
  await saveTasks(tasks);
  console.log(chalk.redBright(`Task deleted successfully.`));
}

async function updateStatus(id, status) {
  const tasks = await loadTasks();
  const taskIndex = Number(id) - 1;

  if (!tasks[taskIndex]) {
    console.log(chalk.red(`Task with ID ${id} not found.`));
    return;
  }

  tasks[taskIndex].status = status;
  await saveTasks(tasks);
  console.log(
    chalk.green(
      `Task updated successfully: ${JSON.stringify(tasks[taskIndex])}`
    )
  );
}

async function listTasks(type) {
  const tasks = await loadTasks();
  const filteredTasks =
    type === "all" ? tasks : tasks.filter((t) => t.status === type);

  if (filteredTasks.length === 0) {
    console.log(chalk.red(`No tasks found with status: ${type}`));
    return;
  }

  console.log(
    chalk.green(`Listing tasks${type === "all" ? "" : ` with status: ${type}`}`)
  );
  console.table(filteredTasks, ["id", "task", "status"]);
}

program
  .name("Task Tracker")
  .description("A CLI tool to manage your tasks")
  .version("1.0.0");

program
  .command("add")
  .description("Add a new task")
  .argument("<task>", "Task description")
  .action(addTask);

program
  .command("update")
  .description("Update an existing task")
  .argument("<id>", "Task ID")
  .argument("<newTask>", "New task description")
  .action(updateTask);

program
  .command("delete")
  .description("Delete a task")
  .argument("<id>", "Task ID")
  .action(deleteTask);

program
  .command("mark-in-progress")
  .description("Mark a task as in-progress")
  .argument("<id>", "Task ID")
  .action((id) => updateStatus(id, "in-progress"));

program
  .command("mark-done")
  .description("Mark a task as done")
  .argument("<id>", "Task ID")
  .action((id) => updateStatus(id, "done"));

program
  .command("list")
  .description("List tasks (all, todo, in-progress, done)")
  .argument("<type>", "Task status or 'all'")
  .action(listTasks);

checkAndCreateFile().then(() => program.parse(process.argv));
