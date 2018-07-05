using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System;

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

        public static long AddUser(User user)
        {
            if (user.username != null) user.username = user.username.ToLower();
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "INSERT INTO users (username, password, firstName, lastName, type, isActive) " +
                        "VALUES (@username, @password, @firstName, @lastName, 'S', 1)";
                    cmd.Parameters.AddWithValue("@username", user.username);
                    cmd.Parameters.AddWithValue("@password", user.password);
                    cmd.Parameters.AddWithValue("@firstName", user.firstName);
                    cmd.Parameters.AddWithValue("@lastName", user.lastName);

                    //Return the last inserted ID if successful
                    if (cmd.ExecuteNonQuery() > 0) return cmd.LastInsertedId;

                    return 0;
                }
            }
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

                    using (MySqlDataReader reader = cmd.ExecuteReader())
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

        //Normal version doesn't save type or isActive
        public static bool ChangeUser(User user)
        {
            string edited = "";
            DateTime before;
            if (user.username != null) user.username = user.username.ToLower();
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
            if (user.username != null) user.username = user.username.ToLower();
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



        public static long CreateCourse(int instructorID)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "INSERT INTO courses (courseName, instructorID, isActive, description) " +
                        "VALUES ('New Course', @instructorID, 1, '')";
                    cmd.Parameters.AddWithValue("@instructorID", instructorID);

                    //Return the last inserted ID if successful
                    if (cmd.ExecuteNonQuery() > 0) return cmd.LastInsertedId;

                    return 0;
                }
            }
        }

        public static long CreateProject(int courseID)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "INSERT INTO projects (projectName, courseID, isActive, description) " +
                        "VALUES ('New Project', @courseID, 1, '')";
                    cmd.Parameters.AddWithValue("@courseID", courseID);

                    //Return the last inserted ID if successful
                    if (cmd.ExecuteNonQuery() > 0) return cmd.LastInsertedId;

                    return 0;
                }
            }
        }

        public static bool LeaveGroup(int userID, int groupID)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                        cmd.CommandText = "DELETE FROM uGroups ug INNER JOIN groups g ON ug.groupID = g.groupID" +
                            "WHERE userID = @userID AND groupID = @groupID ";
                        cmd.Parameters.AddWithValue("@userID", userID);
                        cmd.Parameters.AddWithValue("@groupID", groupID);
                        if (cmd.ExecuteNonQuery() > 0) return true;
                    return false;
                }
            }
        }

        public static long CreateGroup(int projectID)

        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "INSERT INTO groups (groupName, isActive, evalID, projectID) " +
                                      "VALUES ('New Group', 1, 0, @projectID);";
                    cmd.Parameters.AddWithValue("@projectID", projectID);

                    //Return the last inserted ID if successful
                    if (cmd.ExecuteNonQuery() > 0) return cmd.LastInsertedId;

                    return 0;
                }
            }
        }

        public static long CreateTimeCard(TimeCard timeCard)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "INSERT INTO timeCards (timeIn, timeOut, isEdited, createdOn, userID, groupID, description)" +
                                      " VALUES (@timeIn, @timeOut, 0, @createdOn, @userID, @groupID, @description);";

                    cmd.Parameters.AddWithValue("@timeIn", timeCard.timeIn);
                    cmd.Parameters.AddWithValue("@timeOut", timeCard.timeOut);
                    cmd.Parameters.AddWithValue("@createdOn", timeCard.createdOn);
                    cmd.Parameters.AddWithValue("@userID", timeCard.userID);
                    cmd.Parameters.AddWithValue("@groupID", timeCard.groupID);
                    cmd.Parameters.AddWithValue("@description", timeCard.description);


                    //Return the last inserted ID if successful
                    if (cmd.ExecuteNonQuery() > 0) return cmd.LastInsertedId;

                    return 0;
                }
            }
        }

        public static bool DeleteUserCourse(int userID, int courseID)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM uCourses WHERE userID = @userID AND courseID = @courseID";
                    cmd.Parameters.AddWithValue("@userID", userID);
                    cmd.Parameters.AddWithValue("@courseID", courseID);

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
                        "SELECT c.*, uc.isActive AS ucIsActive, u.userID, u.firstName, u.lastName FROM courses c " +
                        "LEFT JOIN uCourses uc ON c.courseID = uc.courseID LEFT JOIN users u ON uc.userID = u.userID " +
                        "WHERE c.courseID = @courseID";
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
                                description = reader.GetString("description"),
                                isActive = reader.GetBoolean("isActive"),
                            });
                        }
                    }
                }
            }
            return course;
        }

        public static Project GetProject(int projectID)
        {
            Project project = new Project()
            {
                groups = new List<Group>()
            };

            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText =
                        "Select p.*, g.groupID, g.groupName, g.isActive AS groupIsActive, u.userID, u.firstName, u.lastName, t.groupID AS 'tgroupID', t.timeID, " +
                          "date_format(t.timeIn, '%m/%d/%Y %l:%i %p') AS 'timeIn', date_format(t.timeOut, '%m/%d/%Y %l:%i %p') AS 'timeOut', " +
                          "t.description AS 'timeDescription', t.isEdited, t.userID AS 'tuserID', ug.isActive AS isActiveInGroup " +
                        "FROM projects p " +
                        "Left Join groups g On p.projectID = g.projectID " +
                        "Left Join uGroups ug On ug.groupID = g.groupID " +
                        "Left Join users u On u.userID = ug.userID " +
                        "Left Join timeCards t On (u.userID = t.userID AND g.groupID = t.groupID) " +
                        "Where p.projectID = @projectID";
                    cmd.Parameters.AddWithValue("@projectID", projectID);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            if (project.projectID == 0)
                            {
                                project.projectID = reader.GetInt32("projectID");
                                project.projectName = reader.GetString("projectName");
                                project.isActive = reader.GetBoolean("isActive");
                                project.description = reader.GetString("description");
                                project.CourseID = reader.GetInt32("courseID");
                            }

                            bool foundGroup = false;

                            foreach(Group group in project.groups)
                            {

                                if(group.groupID == reader.GetInt32("groupID"))
                                {
                                    foundGroup = true;

                                    bool foundUser = false;

                                    if (group.users == null) group.users = new List<User>();

                                    if(group.groupID == 0)
                                    {
                                        group.groupName = reader.GetString("groupName");
                                        group.groupID = reader.GetInt32("groupID");
                                        group.isActive = reader.GetBoolean("groupIsActive");
                                    }

                                    //get each users time info
                                    foreach (User user in group.users)
                                    {
                                        if (user.userID == reader.GetInt32("userID"))
                                        {
                                            foundUser = true;
                                            //Add time slot

                                            if (user.timecards == null) user.timecards = new List<TimeCard>();

                                            if (!reader.IsDBNull(13))
                                            {
                                                user.timecards.Add(new TimeCard()
                                                {
                                                    timeIn = reader.GetString("timeIn"),
                                                    timeOut = reader.GetString("timeOut"),
                                                    description = reader.GetString("description"),
                                                    groupID = reader.GetInt32("tgroupID"),
                                                    timeslotID = reader.GetInt32("timeID"),
                                                    isEdited = reader.GetBoolean("isEdited"),
                                                    userID = reader.GetInt32("tuserID")
                                                });
                                            }
                                        }
                                    }

                                    if (!foundUser)
                                    {
                                        List<TimeCard> timecardlist = new List<TimeCard>();
                                        if (!reader.IsDBNull(13))
                                        {
                                            timecardlist.Add(new TimeCard()
                                            {
                                                timeIn = reader.GetString("timeIn"),
                                                timeOut = reader.GetString("timeOut"),
                                                description = reader.GetString("description"),
                                                groupID = reader.GetInt32("tgroupID"),
                                                timeslotID = reader.GetInt32("timeID"),
                                                isEdited = reader.GetBoolean("isEdited"),
                                                userID = reader.GetInt32("tuserID")
                                            });
                                        }

                                        //Add the user and then the time slot
                                        if (!reader.IsDBNull(9))
                                        {
                                            group.users.Add(new User()
                                            {
                                                userID = reader.GetInt32("userID"),
                                                firstName = reader.GetString("firstName"),
                                                lastName = reader.GetString("lastName"),
                                                timecards = timecardlist,
                                                isActive = reader.GetBoolean("isActiveInGroup")
                                            });
                                        }
                                    }
                                }
                            }

                            if(!foundGroup)
                            {
                                List<TimeCard> timecardlist = new List<TimeCard>();
                                if (!reader.IsDBNull(13))
                                {
                                    timecardlist.Add(new TimeCard()
                                    {
                                        timeIn = reader.GetString("timeIn"),
                                        timeOut = reader.GetString("timeOut"),
                                        description = reader.GetString("timeDescription"),
                                        groupID = reader.GetInt32("tgroupID"),
                                        timeslotID = reader.GetInt32("timeID"),
                                        isEdited = reader.GetBoolean("isEdited")
                                    });
                                }

                                List<User> users = new List<User>();
                                if (!reader.IsDBNull(9))
                                {
                                    users.Add(new User()
                                    {
                                        userID = reader.GetInt32("userID"),
                                        firstName = reader.GetString("firstName"),
                                        lastName = reader.GetString("lastName"),
                                        timecards = timecardlist,
                                        isActive = reader.GetBoolean("isActiveInGroup")
                                    });
                                }

                                if (!reader.IsDBNull(5))
                                {
                                    project.groups.Add(new Group()
                                    {
                                        groupID = reader.GetInt32("groupID"),
                                        groupName = reader.GetString("groupName"),
                                        isActive = reader.GetBoolean("groupIsActive"),
                                        users = users
                                    });
                                }
                            }

                        }
                    }
                }
            }
            return project;
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

        public static int GetCourseForProject(int projectID)
        {
            int courseID = 0;
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "SELECT courseID FROM projects WHERE projectID = @projectID";
                    cmd.Parameters.AddWithValue("@projectID", projectID);

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

        public static Group GetGroup(int groupID)
        {
            Group group = new Group();
            group.users = new List<User>();
            bool foundUser = false;

            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "Select g.*, u.userID, u.firstName, u.lastName, t.groupID AS 'tgroupID', t.timeID, " +
                                      "date_format(t.timeIn, '%m/%d/%Y %l:%i %p') AS 'timeIn', date_format(t.timeOut, '%m/%d/%Y %l:%i %p') AS 'timeOut', " +
                                      "t.description, t.isEdited, t.userID AS 'tuserID', ug.isActive AS isActiveInGroup  " +
                                      "From groups g Left Join uGroups ug On " +
                                      "ug.groupID = g.groupID " +
                                      "Left Join users u On " +
                                      "u.userID = ug.userID " +
                                      "Left Join timeCards t On " +
                                      "(u.userID = t.userID AND g.groupID = t.groupID) " +
                                      "Where g.groupID = @groupID";
                    cmd.Parameters.AddWithValue("@groupID", groupID);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {

                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            foundUser = false;
                            group.groupName = reader.GetString("groupName");
                            group.groupID = reader.GetInt32("groupID");
                            group.isActive = reader.GetBoolean("isActive");
                            group.projectID = reader.GetInt32("projectID");

                            //get each users time info
                            foreach (User user in group.users)
                            {
                                if (user.userID == reader.GetInt32("userID"))
                                {
                                    foundUser = true;
                                    //Add time slot

                                    if (user.timecards == null) user.timecards = new List<TimeCard>();

                                    if (!reader.IsDBNull(9))
                                    {
                                        user.timecards.Add(new TimeCard()
                                        {
                                            timeIn = reader.GetString("timeIn"),
                                            timeOut = reader.GetString("timeOut"),
                                            description = reader.GetString("description"),
                                            groupID = reader.GetInt32("tgroupID"),
                                            timeslotID = reader.GetInt32("timeID"),
                                            isEdited = reader.GetBoolean("isEdited"),
                                            userID = reader.GetInt32("tuserID")
                                        });
                                    }
                                }
                            }

                            if (!foundUser)
                            {
                                List<TimeCard> timecardlist = new List<TimeCard>();
                                if (!reader.IsDBNull(9))
                                {
                                    timecardlist.Add(new TimeCard()
                                    {
                                        timeIn = reader.GetString("timeIn"),
                                        timeOut = reader.GetString("timeOut"),
                                        description = reader.GetString("description"),
                                        groupID = reader.GetInt32("tgroupID"),
                                        timeslotID = reader.GetInt32("timeID"),
                                        isEdited = reader.GetBoolean("isEdited"),
                                        userID = reader.GetInt32("tuserID")
                                    });
                                }

                                //Add the user and then the time slot
                                if (!reader.IsDBNull(5))
                                {
                                    group.users.Add(new User()
                                    {
                                        userID = reader.GetInt32("userID"),
                                        firstName = reader.GetString("firstName"),
                                        lastName = reader.GetString("lastName"),
                                        timecards = timecardlist,
                                        isActive = reader.GetBoolean("isActiveInGroup")
                                    });
                                }
                            }
                        }
                    }
                }
            }
            return group;
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

        public static List<Dashboard> GetDashboard(int userID)
        {
            List<Dashboard> dashboard = new List<Dashboard>();
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "SELECT g.groupID, g.groupName, p.projectID, p.projectName, c.courseID, c.courseName, " +
                        "u.userID AS 'instructorID', CONCAT(u.firstName, ' ',u.lastName) as instructorName FROM uGroups uG " +
                        "LEFT JOIN groups g ON g.groupID = uG.groupID " +
                        "LEFT JOIN projects p ON g.projectID = p.projectID " +
                        "LEFT JOIN courses c on p.courseID = c.courseID " +
                        "LEFT JOIN users u ON c.instructorID = u.userID " +
                        "WHERE uG.userID = @userID " +
                        "AND uG.isActive = 1 " +
                        "AND g.isActive = 1 " +
                        "AND p.isActive = 1 " +
                        "AND c.isActive = 1 ";
                    cmd.Parameters.AddWithValue("@userID", userID);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            dashboard.Add(new Dashboard()
                            {
                                groupID = reader.GetInt32("groupID"),
                                groupName = reader.GetString("groupName"),
                                projectID = reader.GetInt32("projectID"),
                                projectName = reader.GetString("projectName"),
                                courseID = reader.GetInt32("courseID"),
                                courseName = reader.GetString("courseName"),
                                instructorID = reader.GetInt32("instructorID"),
                                instructorName = reader.GetString("instructorName")
                            });
                        }
                    }
                }
            }
            return dashboard;
        }

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

        public static User GetUser(string username, string password)
        {
            username = username.ToLower();
            User user = null;
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "SELECT * FROM users WHERE username = @username AND password = @password";
                    cmd.Parameters.AddWithValue("@username", username);
                    cmd.Parameters.AddWithValue("@password", password);

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

        public static bool IsUserInGroup(int userID, int groupID)
        {
            bool isInGroup = false;
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {

                    //SQL and Parameters
                    cmd.CommandText = " SELECT * FROM uGroups WHERE userID = @userID AND groupID = @groupID";
                    cmd.Parameters.AddWithValue("@userID", userID);
                    cmd.Parameters.AddWithValue("@groupID", groupID);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            if (!isInGroup) isInGroup = true;
                        }
                    }
                }
            }
            return isInGroup;
        }

        public static bool IsActiveUserInGroup(int userID, int groupID)
        {
            bool isInGroup = false;
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {

                    //SQL and Parameters
                    cmd.CommandText = " SELECT * FROM uGroups WHERE userID = @userID AND groupID = @groupID AND isActive = 1";
                    cmd.Parameters.AddWithValue("@userID", userID);
                    cmd.Parameters.AddWithValue("@groupID", groupID);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            if (!isInGroup) isInGroup = true;
                        }
                    }
                }
            }
            return isInGroup;
        }

        public static bool IsUserInOtherGroup(int userID, int groupID)
        {
            bool isInGroup = false;
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {

                    //SQL and Parameters
                    cmd.CommandText = " Select u.userID, u.firstName, u.lastName, ug.groupID From users u " +
                        "Inner Join uGroups ug On u.userID = ug.userID Inner Join groups g On ug.groupID = g.groupID Where u.userID = @userID " +
                        "And g.projectID = 	(SELECT projectID FROM groups WHERE groupID = @groupID) " +
                        "And ug.isActive = 1";
                    cmd.Parameters.AddWithValue("@userID", userID);
                    cmd.Parameters.AddWithValue("@groupID", groupID);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            if (!isInGroup) isInGroup = true;
                        }
                    }
                }
            }
            return isInGroup;
        }

        public static bool IsUserInGroupForProject(int userID, int projectID)
        {
            bool isInGroup = false;
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {

                    //SQL and Parameters
                    cmd.CommandText = " Select u.userID, u.firstName, u.lastName, ug.groupID From users u " +
                                      "Inner Join uGroups ug On u.userID = ug.userID Inner Join groups g On ug.groupID = g.groupID Where u.userID = @userID " +
                                      "And g.projectID = @projectID " +
                                      "And ug.isActive = 1";
                    cmd.Parameters.AddWithValue("@userID", userID);
                    cmd.Parameters.AddWithValue("@projectID", projectID);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            if (!isInGroup) isInGroup = true;
                        }
                    }
                }
            }
            return isInGroup;
        }

        public static bool UserHasTimeInGroup(int userID, int groupID)
        {
            bool hasTimeInGroup = false;
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {

                    //SQL and Parameters
                    cmd.CommandText = "SELECT * FROM timeCards WHERE userID = @userID AND groupID = @groupID";
                    cmd.Parameters.AddWithValue("@userID", userID);
                    cmd.Parameters.AddWithValue("@groupID", groupID);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            if (!hasTimeInGroup) hasTimeInGroup = true;
                        }
                    }
                }
            }
            return hasTimeInGroup;
        }

        public static bool JoinCourse(int courseID, int userID)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {

                    cmd.CommandText = "INSERT INTO uCourses (userID, courseID, isActive) VALUES (@userID, @courseID, 0)";
                    cmd.Parameters.AddWithValue("@userID", userID);
                    cmd.Parameters.AddWithValue("@courseID", courseID);
                    if (cmd.ExecuteNonQuery() > 0) return true;

                    return false;
                }
            }
        }

        public static long JoinGroup(int userID, int groupID)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "INSERT INTO uGroups (userID, groupID, isActive) " +
                        "VALUES (@userID, @groupID, 1)";
                    cmd.Parameters.AddWithValue("@userID", userID);
                    cmd.Parameters.AddWithValue("@groupID", groupID);

                    //Return the last inserted ID if successful
                    if (cmd.ExecuteNonQuery() > 0) return cmd.LastInsertedId;

                    return 0;
                }
            }
        }

        public static bool ReJoinGroup(int userID, int groupID)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    //SQL and Parameters
                    cmd.CommandText = "UPDATE uGroups SET isActive = 1 WHERE userID = @userID AND groupID = @groupID";
                    cmd.Parameters.AddWithValue("@userID", userID);
                    cmd.Parameters.AddWithValue("@groupID", groupID);

                    if (cmd.ExecuteNonQuery() > 0) return true;

                    return false;
                }
            }
        }

        public static bool LeaveCourse(int courseID, int userID)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    if (UserIsInCourse(courseID, userID))
                    {
                        cmd.CommandText = "UPDATE uCourses SET isActive = 0 WHERE courseID = @courseID AND userID = @userID";
                        cmd.Parameters.AddWithValue("@userID", userID);
                        cmd.Parameters.AddWithValue("@courseID", courseID);
                        if (cmd.ExecuteNonQuery() > 0) return true;
                    }
                    return false;
                }
            }
        }

        public static bool SaveUserInCourse(uCourse uCourse)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "UPDATE uCourses SET isActive = @isActive WHERE courseID = @courseID AND userID = @userID";
                    cmd.Parameters.AddWithValue("@userID", uCourse.userID);
                    cmd.Parameters.AddWithValue("@courseID", uCourse.courseID);
                    cmd.Parameters.AddWithValue("@isActive", uCourse.isActive);
                    if (cmd.ExecuteNonQuery() > 0) return true;
                    return false;
                }
            }
        }

        public static bool DeleteFromCourse(int courseID, int userID)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    if (UserIsInCourse(courseID, userID))
                    {
                        cmd.CommandText = "DELETE FROM uCourses WHERE courseID = @courseID AND userID = @userID";
                        cmd.Parameters.AddWithValue("@userID", userID);
                        cmd.Parameters.AddWithValue("@courseID", courseID);
                        if (cmd.ExecuteNonQuery() > 0) return true;
                    }
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
                                      "isActive = @isActive, description = @description WHERE courseID = @courseID";
                    cmd.Parameters.AddWithValue("@courseName", course.courseName);
                    cmd.Parameters.AddWithValue("@instructorID", course.instructorID);
                    cmd.Parameters.AddWithValue("@isActive", course.isActive);
                    cmd.Parameters.AddWithValue("@description", course.description);
                    cmd.Parameters.AddWithValue("@courseID", course.courseID);

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
                    cmd.CommandText = "UPDATE groups SET groupName = @groupName, " +
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

        public static bool DeleteFromGroup(int userID, int groupID)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {

                    cmd.CommandText = "DELETE FROM uGroups WHERE userID = @userID AND groupID = @groupID";
                    cmd.Parameters.AddWithValue("@userID", userID);
                    cmd.Parameters.AddWithValue("@groupID", groupID);
                    if (cmd.ExecuteNonQuery() > 0) return true;

                    return false;
                }
            }
        }

        public static bool LeaveGroup(int userID, int groupID)
        {
            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {

                    cmd.CommandText = "UPDATE uGroups SET isActive = 0 WHERE userID = @userID AND groupID = @groupID";
                    cmd.Parameters.AddWithValue("@userID", userID);
                    cmd.Parameters.AddWithValue("@groupID", groupID);
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
                                      "isActive = @isActive, description = @description WHERE projectID = @projectID";
                    cmd.Parameters.AddWithValue("@projectName", project.projectName);
                    cmd.Parameters.AddWithValue("@isActive", project.isActive);
                    cmd.Parameters.AddWithValue("@description", project.description);
                    cmd.Parameters.AddWithValue("@projectID", project.projectID);

                    if (cmd.ExecuteNonQuery() > 0) return true;
                    return false;
                }
            }
        }

        public static bool SaveTime(TimeCard timecard)
        {
            String edited = "";
            DateTime before;
            DateTime after;

            DateTime timeIn = Convert.ToDateTime(timecard.timeIn);
            DateTime timeOut = Convert.ToDateTime(timecard.timeOut);

            using (var conn = new MySqlConnection(connstring.ToString()))
            {
                conn.Open();
                using (MySqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT timeID, createdOn FROM timeCards WHERE timeID = @timeID";
                    cmd.Parameters.AddWithValue("@timeID", timecard.timeslotID);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        //Runs once per record retrieved
                        while (reader.Read())
                        {
                            edited = reader.GetString("createdOn");
                        }
                    }

                    after = Convert.ToDateTime(edited);
                    before = after.AddDays(-7);

                    if (after < before)
                    {
                        cmd.CommandText = "UPDATE timeCards SET timeIn = @timeIn, timeOut = @timeOut, isEdited = 1, description = @description WHERE timeID = @timeID";
                        cmd.Parameters.AddWithValue("@timeIn", timeIn);
                        cmd.Parameters.AddWithValue("@timeOut", timeOut);
                        cmd.Parameters.AddWithValue("@description", timecard.description);
                        if (cmd.ExecuteNonQuery() > 0) return true;
                    }
                    else
                    {
                        cmd.CommandText = "UPDATE timeCards SET timeIn = @timeIn, timeOut = @timeOut, description = @description WHERE timeID = @timeID";
                        cmd.Parameters.AddWithValue("@timeIn", timeIn);
                        cmd.Parameters.AddWithValue("@timeOut", timeOut);
                        cmd.Parameters.AddWithValue("@description", timecard.description);
                        if (cmd.ExecuteNonQuery() > 0) return true;
                    }
                    return false;
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
                    cmd.CommandText = "SELECT userID FROM uCourses WHERE courseID = @courseID AND userID = @userID";
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
    }
}
