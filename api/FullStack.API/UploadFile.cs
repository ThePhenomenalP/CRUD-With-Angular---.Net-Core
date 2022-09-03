using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FullStack.API
{
    public class UploadFile
    {
        
        private readonly IWebHostEnvironment Environment;
        private readonly IHttpContextAccessor httpContextAccessor;
        public UploadFile(IWebHostEnvironment _webHostEnvironment, IHttpContextAccessor _httpContextAccessor)
        {
            Environment = _webHostEnvironment;
            httpContextAccessor = _httpContextAccessor;
        }
        public string upload(IFormFile file)
        {
            //var baseUrl = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
            if (file == null) return "";
            var path =Path.Combine(Environment.WebRootPath, "images", file.FileName);
            using var f = System.IO.File.Create(path);
            file.CopyTo(f);
            return file.FileName;
        }
    }
}
