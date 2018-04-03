using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace time_sucks.Models
{
    public class Group
    {
        public int GroupID { get; set; }
        public int projectID { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
    }
}
