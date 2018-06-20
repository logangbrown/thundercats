using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public static User getUser(string username)
        {
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
                            user = new User();
                            user.userID = reader.GetInt32("userID");
                            user.username = reader.GetString("username");
                            user.firstName = reader.GetString("firstName");
                            user.lastName = reader.GetString("lastName");
                            user.type = reader.GetChar("type");
                            user.isActive = reader.GetBoolean("isActive");
                        }
                    }
                }
            }
            return user;
        }

        public static int getInstructorForCourse(int courseID)
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

        public static bool changePassword(User user)
        {
            string password = "";
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters

                    if (user.type == 'A')
                    {
                        cmd.CommandText = "UPDATE user SET (password = @password) WHERE userID = @userID";
                        cmd.Parameters.AddWithValue("@password", user.password);
                        cmd.Parameters.AddWithValue("@userID", user.userID);

                        if (cmd.ExecuteNonQuery() > 0) return true;
                        return false;

                    }

                    else
                    {


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
                            cmd.CommandText = "UPDATE user SET (password = @password) WHERE userID = @userID";
                            cmd.Parameters.AddWithValue("@password", user.password);
                            cmd.Parameters.AddWithValue("@userID", user.userID);

                            if (cmd.ExecuteNonQuery() > 0) return true;
                            return false;
                        }
                    }
                }
            }
                return false;
        }

        public static User getUser(string username, string password)
        {
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
                            user = new User();
                            user.userID = reader.GetInt32("userID");
                            user.username = reader.GetString("username");
                            user.firstName = reader.GetString("firstName");
                            user.lastName = reader.GetString("lastName");
                            user.type = reader.GetChar("type");
                            user.isActive = reader.GetBoolean("isActive");
                        }
                    }
                }
            }
            return user;
        }

        public static User getUserByID(int ID)
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
                            user = new User();
                            user.userID = reader.GetInt32("userID");
                            user.username = reader.GetString("username");
                            user.firstName = reader.GetString("firstName");
                            user.lastName = reader.GetString("lastName");
                            user.type = reader.GetChar("type");
                            user.isActive = reader.GetBoolean("isActive");
                        }
                    }
                }
            }
            return user;
        }

        public static long addUser(User user)
        {
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

        public static long createCourse(Course course)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "INSERT INTO courses (courseID, courseName, instructorID, isActive, desc)" +
                        "VALUES (@courseID, New Course, @instructorID, 1, @desc)";
                    cmd.Parameters.AddWithValue("@courseID", course.courseID);
                    cmd.Parameters.AddWithValue("@courseName", course.courseName);
                    cmd.Parameters.AddWithValue("@instructorID", course.instructorID);
                    cmd.Parameters.AddWithValue("@desc", course.desc);

                    //Return the last inserted ID if successful
                    if (cmd.ExecuteNonQuery() > 0) return cmd.LastInsertedId;

                    return 0;
                }
            }
        }

        public static List<User> getUsers()
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

        public static List<Course> getCourses()
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
                                desc = reader.GetString("description"),
                                instructorName = reader.GetString("instructorName")
                            });
                        }
                    }
                }
            }
            return course;
        }


        public static bool deleteUserCourse(int userID, int courseID)
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

        public static bool changeUser(User user)
        {
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

        public static bool saveCourse(Course course)
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
                    cmd.Parameters.AddWithValue("@desc", course.desc);
                    cmd.Parameters.AddWithValue("@courseID", course.courseID);

                    if (cmd.ExecuteNonQuery() > 0) return true;
                    return false;
                }
            }
        }

        public static bool saveProject(Project project)
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

        public static bool saveGroup(Group group)
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
                    cmd.Parameters.AddWithValue("@groupID", group.groupdID);

                    if (cmd.ExecuteNonQuery() > 0) return true;
                    return false;
                }
            }
        }

        public static Course getCourse(int courseID)
        {
            Course course = new Course();
            course.users = new List<User>();
            course.projects = new List<Project>();

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
                                course.desc = reader.GetString("description");
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
