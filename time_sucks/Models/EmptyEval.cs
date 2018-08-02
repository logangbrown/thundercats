using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace time_sucks.Models
{
    public class EmptyEval
    {
        public int evalID { get; set; }
        public int evalTemplateQuestionID { get; set; }
        public int evalTemplateQuestionCategoryID { get; set; }
  
        public int evalTemplateID { get; set; }
        public int number { get; set; }
        public List<EvalTemplateQuestionCategory> categories { get; set; }
        public List<EvalTemplateQuestion> templateQuestions { get; set; }
    }
}
