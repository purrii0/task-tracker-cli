# Task Tracker CLI

A simple command-line interface (CLI) tool to track and manage your tasks.

## Installation

1. Clone this repository:

```bash
git clone https://github.com/purrii0/task-tracker-cli.git
cd task-tracker-cli
```

2. Install dependencies:

```bash
npm install
```

## Usage

Run commands using:

```bash
node index.js <command> [arguments]
```

## Commands

### Add a new task

```bash
task-cli add "Buy groceries"
```

Output:
`Task added successfully: {"id":1,"task":"Buy groceries","status":"todo"}`

### Update a task

```bash
task-cli update 1 "Buy groceries and cook dinner"
```

Output:
`Task updated successfully: {"id":1,"task":"Buy groceries and cook dinner","status":"todo"}`

### Delete a task

```bash
task-cli delete 1
```

Output:
`Task deleted successfully.`

### Mark task as in-progress

```bash
task-cli mark-in-progress 1
```

### Mark task as done

```bash
task-cli mark-done 1
```

### List tasks

List only **todo** tasks:

```bash
task-cli list todo
```

List only **in-progress** tasks:

```bash
task-cli list in-progress
```

List only **done** tasks:

```bash
task-cli list done
```

## Task Format

Each task in `tasks.json` has the following properties:

```json
{
  "id": 1,
  "task": "Buy groceries",
  "status": "todo"
}
```
