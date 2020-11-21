# Gigapet API

### Welcome

Welcome to the Gigapets backend API.  You can access the website by going to [https://ken-gigapets.herokuapp.com/] (https://ken-gigapets.herokuapp.com/)
___

Status code 500 error returns:
| Key       | Value                      |
| --------- | -------------------------- |
| "message" | "Internal server error..." |
___

##### The Welcome Page

`Route: /`

Returns:
| Key       | Value                     |
| --------- | ------------------------- |
| "message" | "Welcome to the website!" |

Error: Status code 500
___

##### Non-Restricted Routes

Register a user: `Route: /api/auth/register`

Parameters:
| Key            | Required |
| -------------- | -------- |
| **username**   | Yes      |
| **password**   | Yes      |
| **first_name** | No       |
| **last_name**  | No       |

Returns:
| Key       | Value                   |
| --------- | ----------------------- |
| "message" | "User has been created" |
| "newUser" | **username**            |
|           | **password**            |
|           | **first_name**          |
|           | **last_name**           |

Error - Password length less than 6 characters:
| Key       | Value                                         |
| --------- | --------------------------------------------- |
| "message" | "Password must contain 6 or more characters." |

Error - Either the username or password not given:
| Key       | Value                                          |
| --------- | ---------------------------------------------- |
| "message" | "Both a username and a password are required." |
___

##### Restricted Routes

Get user information: `Route: /api/auth/users/:id`

Returns:
| Value                   | Type   |
| ----------------------- | ------ |
| **username**            | string |
| **first_name**          | string |
| **last_name**           | string |
| **children**            | array  |