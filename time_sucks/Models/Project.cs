using System.Collections.Generic;

namespace time_sucks.Models
{
    public class Project
    {
        public int projectID { get; set; }

        public string projectName { get; set; }

        public bool isActive { get; set; }

        public string desc { get; set; }

        public List<Group> groups { get; set; }

        public int CourseID { get; set; }

    }
}
