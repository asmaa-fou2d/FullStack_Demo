using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;

namespace GoodAdvice.Controllers
{
    public class BaseAPIController : ApiController
    {
        protected IHttpActionResult ReturnResponse(object data, ModelStateDictionary modelSate)
        {
            if (ModelState.IsValid && data != null)
                return Ok(data);
            else
            {
                var result = modelSate.Values.SelectMany(u => u.Errors).First().ErrorMessage;
                return BadRequest(result);

            }
        }

    }
}
