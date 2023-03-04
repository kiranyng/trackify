The application is a todo list manager.
It is saved in JSON format, and is typically an array of projects.
Each project is an object with the following properties:
name: a string representing the name of the project.
id: a string representing the ID of the project.
content: an object representing the content of the project, with dynamic keys representing folder IDs and values representing the contents of the folders.
task_timers: an object with properties active and queue, where active is a string and queue is an array of objects with properties id, folder, title, and estimate.
recents: an object with properties items and map. items is an array of objects with properties folder, id, and type. map is an object with dynamically assigned keys, each of which is of type boolean.
search: an object with property term, which is a string.
toast: an object with property msg, which is a string.
Each folder in the project is an object with the following properties:
name: a string representing the name of the folder.
folder: a string representing the ID of the parent folder.
id: a string representing the ID of the folder (which is also the key in the content object).
fldr: a map with dynamically generated keys representing subfolders of the current folder, and values of 1.
notes: a map with dynamically generated keys representing notes in the folder, and values of objects with properties folder, text, id, and title.
tasks: a map with dynamically generated keys representing tasks in the folder, and values of objects with properties folder, title, description, priority, estimate, deadline, progress, status, and id.
The application always starts with only one root folder whose ID is $.
For now we consider that the app only deals with one project all the time.

Property	Data Type	Description
-------------------------------------
id	string	Unique identifier for the project.
name	string	Name of the project.
content	object	The heart of the project, contains folders, notes and tasks.
task_timers	object	An object representing the active task timer and the queue.
recents	object	An object containing the recently viewed items and a map.
search	object	An object containing the search term.
toast	object	An object containing the message for a toast notification.
content.$	object	The root folder of the project.
content.$.name	string	Name of the root folder.
content.$.id	string	ID of the root folder.
content.$.fldr	object	A map representing the subfolders of the root folder.
content.$.notes	object	A map containing the notes in the root folder.
content.$.tasks	object	A map containing the tasks in the root folder.
content.$.fldr.{id}	number	The value will always be 1.
content.{id}.name	string	Name of the folder.
content.{id}.id	string	ID of the folder.
content.{id}.folder	string	ID of the parent folder.
content.{id}.fldr	object	A map representing the subfolders of the folder.
content.{id}.notes	object	A map containing the notes in the folder.
content.{id}.tasks	object	A map containing the tasks in the folder.
content.{id}.fldr.{id}	number	The value will always be 1.
content.{id}.notes.{id}	object	An object containing details about the note.
content.{id}.notes.{id}.folder	string	ID of the folder that the note belongs to.
content.{id}.notes.{id}.id	string	ID of the note.
content.{id}.notes.{id}.title	string	Title of the note.
content.{id}.notes.{id}.text	string	Text content of the note.
content.{id}.tasks.{id}	object	An object containing details about the task.
content.{id}.tasks.{id}.folder	string	ID of the folder that the task belongs to.
content.{id}.tasks.{id}.title	string	Title of the task.
content.{id}.tasks.{id}.description	string	Description of the task.
content.{id}.tasks.{id}.priority	number	Priority of the task (0-100).
content.{id}.tasks.{id}.estimate	number	Estimate time in minutes for the task.
content.{id}.tasks.{id}.deadline	timestamp	Deadline of the task.
content.{id}.tasks.{id}.progress	number	Progress of the task (0-100).
