using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace time_sucks.Models
{
    public class Course
    {
        public int CourseID { get; set; }
        public int UserID { get; set; }
        public bool IsActive { get; set; }

    }
}
