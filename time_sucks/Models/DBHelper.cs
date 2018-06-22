using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace time_sucks.Models
{
    public class DBHelper
    {
        //TODO Make this a better system user
        static private MySqlConnectionStringBuilder connstring = new MySqlConnectionStringBuilder("" +
            "Server=cs4450.cj7o28wmyp47.us-east-2.rds.amazonaws.com;" +
            "UID=Logan;" +
            "password=password;" +
            "database=cs4450");

        public static User GetUser(string username)
        {
            username = username.ToLower();
            User user = null;
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "SELECT * FROM users WHERE username = @username";
                    cmd.Parameters.AddWithValue("@username", username);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            user = new User()
                            {
                                userID = reader.GetInt32("userID"),
                                username = reader.GetString("username"),
                                firstName = reader.GetString("firstName"),
                                lastName = reader.GetString("lastName"),
                                type = reader.GetChar("type"),
                                isActive = reader.GetBoolean("isActive")
                            };
                        }
                    }
                }
            }
            return user;
        }

        public static int GetInstructorForCourse(int courseID)
        {
            int instructorID = 0;
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "SELECT instructorID FROM courses WHERE courseID = @courseID";
                    cmd.Parameters.AddWithValue("@courseID", courseID);

                    // cmd.CommandText = "SELECT firstName, lastName FROM courses WHERE "
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            instructorID = reader.GetInt32("instructorID");
                        }
                    }
                }
            }
            return instructorID;
        }

        public static int GetCourseForGroup(int groupID)
        {
            int courseID = 0;
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "SELECT c.courseID FROM courses c LEFT JOIN projects p ON (c.courseID = p.courseID) " +
                        "LEFT JOIN groups g ON (p.projectID = g.projectID) WHERE g.groupID = @groupID";
                    cmd.Parameters.AddWithValue("@groupID", groupID);

                    // cmd.CommandText = "SELECT firstName, lastName FROM courses WHERE "
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            courseID = reader.GetInt32("courseID");
                        }
                    }
                }
            }
            return courseID;
        }
        
        public static bool JoinCourse(int courseID, int userID)
        {   
             using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    if (UserIsInCourse(courseID, userID))
                    {
                        cmd.CommandText = "UPDATE uCourses SET userID = @userID WHERE userID = @userID"; 
                        cmd.Parameters.AddWithValue("@userID", userID);
                        cmd.Parameters.AddWithValue("@courseID", courseID);
                        if (cmd.ExecuteNonQuery() > 0) return true;
                        return false;
                    }
                    else
                    {
                        cmd.CommandText = "INSERT INTO uCourses (userID, courseID) VALUES (@userID, @courseID)";
                        if (cmd.ExecuteNonQuery() > 0) return true;
                        return false;
                    }
                }
             }
            
            
        }
        

        public static bool UserIsInCourse(int courseID, int userID)
        {
            bool isInCourse = false;
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "SELECT userID FROM uCourse WHERE courseID = @courseID AND userID = @userID";
                    cmd.Parameters.AddWithValue("@courseID", courseID);
                    cmd.Parameters.AddWithValue("@userID", userID);

                    // cmd.CommandText = "SELECT firstName, lastName FROM courses WHERE "
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            if (!isInCourse) isInCourse = true;
                        }
                    }
                }
            }
            return isInCourse;
        }

        //Normal version requires current password to be passed
        public static bool ChangePassword(User user)
        {
            string password = "";
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    
                    cmd.CommandText = "SELECT password FROM users WHERE userID = @userID";
                    cmd.Parameters.AddWithValue("@userID", user.userID);

                    using(MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            password = reader.GetString("password");
                        }
                    }

                    if (password == user.password)
                    {
                        cmd.CommandText = "UPDATE users SET password = @password WHERE userID = @userID"; 
                        cmd.Parameters.AddWithValue("@password", user.newPassword);

                        if (cmd.ExecuteNonQuery() > 0) return true;
                        return false;
                    }
                    
                }
            }
                return false;
        }
        
        //Admin version doesn't require the current password to be passed
        public static bool ChangePasswordA(User user)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "UPDATE users SET password = @password WHERE userID = @userID";
                    cmd.Parameters.AddWithValue("@password", user.newPassword);
                    cmd.Parameters.AddWithValue("@userID", user.userID);

                    if (cmd.ExecuteNonQuery() > 0) return true;
                    return false;

                }
            }
        }
        
        public static User GetUser(string username, string password)
        {
            username = username.ToLower();
            User user = null;
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using(MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "SELECT * FROM users WHERE username = @username AND password = @password";
                    cmd.Parameters.AddWithValue("@username", username);
                    cmd.Parameters.AddWithValue("@password", password);

                    using(MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            user = new User()
                            {
                                userID = reader.GetInt32("userID"),
                                username = reader.GetString("username"),
                                firstName = reader.GetString("firstName"),
                                lastName = reader.GetString("lastName"),
                                type = reader.GetChar("type"),
                                isActive = reader.GetBoolean("isActive")
                            };
                        }
                    }
                }
            }
            return user;
        }

        public static User GetUserByID(int ID)
        {
            User user = null;
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "SELECT * FROM users WHERE userID = @ID";
                    cmd.Parameters.AddWithValue("@ID", ID);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            user = new User()
                            {
                                userID = reader.GetInt32("userID"),
                                username = reader.GetString("username"),
                                firstName = reader.GetString("firstName"),
                                lastName = reader.GetString("lastName"),
                                type = reader.GetChar("type"),
                                isActive = reader.GetBoolean("isActive")
                            };
                        }
                    }
                }
            }
            return user;
        }

        public static long AddUser(User user)
        {
            if(user.username != null) user.username = user.username.ToLower();
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "INSERT INTO users (username, password, firstName, lastName, type, isActive)" +
                        "VALUES (@username, @password, @firstName, @lastName, 'S', 1)";
                    cmd.Parameters.AddWithValue("@username", user.username);
                    cmd.Parameters.AddWithValue("@password", user.password);
                    cmd.Parameters.AddWithValue("@firstName", user.firstName);
                    cmd.Parameters.AddWithValue("@lastName", user.lastName);

                    //Return the last inserted ID if successful
                    if(cmd.ExecuteNonQuery() > 0) return cmd.LastInsertedId;

                    return 0;
                }
            }
        }

        public static long CreateCourse(Course course)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "INSERT INTO courses (courseName, instructorID, isActive, description)" +
                        "VALUES ('New Course', @instructorID, 1, 'No description')";
                    cmd.Parameters.AddWithValue("@courseName", course.courseName);
                    cmd.Parameters.AddWithValue("@instructorID", course.instructorID);
                    cmd.Parameters.AddWithValue("@description", course.description);

                    //Return the last inserted ID if successful
                    if (cmd.ExecuteNonQuery() > 0) return cmd.LastInsertedId;

                    return 0;
                }
            }
        }

        public static List<User> GetUsers()
        {
            List<User> user = new List<User>();

            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "SELECT * FROM users";

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {

                            user.Add(new User()
                            {
                                userID = reader.GetInt32("userID"),
                                username = reader.GetString("username"),
                                firstName = reader.GetString("firstName"),
                                lastName = reader.GetString("lastName"),
                                type = reader.GetChar("type"),
                                isActive = reader.GetBoolean("isActive"),
                            });
                        }
                    }
                }
            }
            return user;
        }

        public static List<Course> GetCourses()
        {
            List<Course> course = new List<Course>();
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "Select c.*, CONCAT(u.firstName, ' ',u.lastName) as instructorName " +
                        "FROM courses c " +
                        "LEFT JOIN users u ON (c.instructorID = u.userID)";

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {

                            course.Add(new Course()
                            {
                                courseID = reader.GetInt32("courseID"),
                                courseName = reader.GetString("courseName"),
                                instructorID = reader.GetInt32("instructorID"),
                                isActive = reader.GetBoolean("isActive"),
                                description = reader.GetString("description"),
                                instructorName = reader.GetString("instructorName")
                            });
                        }
                    }
                }
            }
            return course;
        }


        public static bool DeleteUserCourse(int userID, int courseID)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM uCourse WHERE userID = @userID AND courseID = @courseID";
                    cmd.Parameters.AddWithValue("@userID", userID);
                    cmd.Parameters.AddWithValue("@courseID", courseID);

                    if (cmd.ExecuteNonQuery() > 0) return true;
                    return false;
                }
            }
        }
      
        //Normal version doesn't save type or isActive
        public static bool ChangeUser(User user)
        {
            if(user.username != null) user.username = user.username.ToLower();
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "UPDATE users SET username = @username, firstName = @firstName, lastName = @lastName WHERE userID = @userID";
                    cmd.Parameters.AddWithValue("@username", user.username);
                    cmd.Parameters.AddWithValue("@firstName", user.firstName);
                    cmd.Parameters.AddWithValue("@lastName", user.lastName);
                    cmd.Parameters.AddWithValue("@userID", user.userID);

                    if (cmd.ExecuteNonQuery() > 0) return true;
                    return false;
                }
            }
        }

        //Admin version also saves type and isActive
        public static bool ChangeUserA(User user)
        {
            if(user.username != null) user.username = user.username.ToLower();
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "UPDATE users SET username = @username, firstName = @firstName, lastName = @lastName, type = @type, isActive = @isActive WHERE userID = @userID";
                    cmd.Parameters.AddWithValue("@username", user.username);
                    cmd.Parameters.AddWithValue("@firstName", user.firstName);
                    cmd.Parameters.AddWithValue("@lastName", user.lastName);
                    cmd.Parameters.AddWithValue("@type", user.type);
                    cmd.Parameters.AddWithValue("@isActive", user.isActive);
                    cmd.Parameters.AddWithValue("@userID", user.userID);

                    if (cmd.ExecuteNonQuery() > 0) return true;
                    return false;
                }
            }
        }


        public static bool SaveCourse(Course course)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    // SQL and Parameters
                    cmd.CommandText = "UPDATE courses SET courseName = @courseName, instructorID = @instructorID, " +
                                      "isActive = @isActive, description = @desc WHERE courseID = @courseID";
                    cmd.Parameters.AddWithValue("@courseName", course.courseName);
                    cmd.Parameters.AddWithValue("@instructorID", course.instructorID);
                    cmd.Parameters.AddWithValue("@isActive", course.isActive);
                    cmd.Parameters.AddWithValue("@desc", course.description);
                    cmd.Parameters.AddWithValue("@courseID", course.courseID);

                    if (cmd.ExecuteNonQuery() > 0) return true;
                    return false;
                }
            }
        }

        public static bool SaveProject(Project project)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    // SQL and Parameters
                    cmd.CommandText = "UPDATE projects SET projectName = @projectName, " +
                                      "isActive = @isActive, description = @desc WHERE projectID = @projectID";
                    cmd.Parameters.AddWithValue("@projectName", project.projectName);
                    cmd.Parameters.AddWithValue("@isActive", project.isActive);
                    cmd.Parameters.AddWithValue("@desc", project.desc);
                    cmd.Parameters.AddWithValue("@projectID", project.projectID);

                    if (cmd.ExecuteNonQuery() > 0) return true;
                    return false;
                }
            }
        }

        public static bool SaveGroup(Group group)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    // SQL and Parameters
                    cmd.CommandText = "UPDATE group SET groupName = @groupName, " +
                                      "isActive = @isActive, evalID = @evalID, projectID = @projectID WHERE groupID = @groupID";
                    cmd.Parameters.AddWithValue("@groupName", group.groupName);
                    cmd.Parameters.AddWithValue("@isActive", group.isActive);
                    cmd.Parameters.AddWithValue("@evalID", group.evalID);
                    cmd.Parameters.AddWithValue("@projectID", group.projectID);
                    cmd.Parameters.AddWithValue("@groupID", group.groupID);

                    if (cmd.ExecuteNonQuery() > 0) return true;
                    return false;
                }
            }
        }

        public static Course GetCourse(int courseID)
        {
            Course course = new Course()
            {
                users = new List<User>(),
                projects = new List<Project>()
            };

            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText =
                        "SELECT c.*, uc.isActive AS ucIsActive, u.userID, u.firstName, u.lastName FROM courses c" +
                        " LEFT JOIN uCourse uc ON c.courseID = uc.courseID LEFT JOIN users u ON uc.userID = u.userID" +
                        " WHERE c.courseID = @courseID";
                    cmd.Parameters.AddWithValue("@courseID", courseID);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            if (course.courseID == 0)
                            {
                                course.courseID = reader.GetInt32("courseId");
                                course.courseName = reader.GetString("courseName");
                                course.instructorID = reader.GetInt32("instructorId");
                                course.isActive = reader.GetBoolean("isActive");
                                course.description = reader.GetString("description");
                            }

                            if (!reader.IsDBNull(6))
                            {
                                course.users.Add(new User()
                                {
                                    userID = reader.GetInt32("userID"),
                                    firstName = reader.GetString("firstName"),
                                    lastName = reader.GetString("lastName"),
                                    isActive = reader.GetBoolean("ucIsActive"),
                                });

                            }
                            
                        }
                    }

                    cmd.CommandText = "SELECT * FROM projects WHERE courseID = @courseID";

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            course.projects.Add(new Project()
                            {
                                projectID = reader.GetInt32("projectID"),
                                projectName = reader.GetString("projectName"),
                                desc = reader.GetString("description"),
                                isActive = reader.GetBoolean("isActive"),
                            });
                        }
                    }
                }
            }
            return course;
        }
    }
}
