using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace time_sucks.Models
{
    public class Project
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        public string name { get; set; }

        public bool isActive { get; set; }

        public List<Group> groups { get; set; }

        // public int CourseID { get; set; }
        // public int UserID { get; set; }

        public Project()
        {
            isActive = true;
            name = "New Project";
            groups = new List<Group>();
        }

        public Project(String newName)
        {
            name = newName;
            isActive = true;
            groups = new List<Group>();
        }

        public Project(Project project)
        {
          
            name = project.name;
            isActive = project.isActive;
            groups = project.groups;
        }

    }
}
