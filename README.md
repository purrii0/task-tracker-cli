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
node index.js add "Buy groceries"
```

Output:
`Task added successfully: {"id":1,"task":"Buy groceries","status":"todo"}`

### Update a task

```bash
node index.js update 1 "Buy groceries and cook dinner"
```

Output:
`Task updated successfully: {"id":1,"task":"Buy groceries and cook dinner","status":"todo"}`

### Delete a task

```bash
node index.jsdelete 1
```

Output:
`Task deleted successfully.`

### Mark task as in-progress

```bash
node index.js mark-in-progress 1
```

### Mark task as done

```bash
node index.js mark-done 1
```

### List tasks

List only **todo** tasks:

```bash
node index.js list todo
```

List only **in-progress** tasks:

```bash
node index.js list in-progress
```

List only **done** tasks:

```bash
node index.js list done
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

project url:
https://roadmap.sh/projects/task-tracker
