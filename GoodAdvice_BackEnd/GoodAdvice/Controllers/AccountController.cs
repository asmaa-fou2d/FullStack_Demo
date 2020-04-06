using GoodAdvice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace GoodAdvice.Controllers
{
    public class AccountController : BaseAPIController
    {
        [HttpGet]
        [Route("api/Account/getAccountData")]
        [Authorize]
        public IHttpActionResult getAccountData()
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> userClaims = identity.Claims;
            AccountModel account = new AccountModel
            {
                UserName = identity.FindFirst("UserName").Value,
                Email = identity.FindFirst("Email").Value
            };
            return ReturnResponse(account, ModelState);
        }
    }
}
