using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactPeopleWithBackend.Data;

namespace ReactPeopleWithBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("GetAll")]
        [HttpGet]
        public List<Person> GetAll()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetAll();
        }

        [Route("Add")]
        [HttpPost]
        public void AddPerson(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.AddPerson(person);
        }

        [Route("Delete")]
        [HttpPost]
        public void DeletePerson(int id)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeletePerson(id);
        }

        [Route("DeleteMutliple")]
        [HttpPost]
        public void DeleteMultiple(List<Person> people)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeleteMultiplePeople(people);
        }

        [Route("Edit")]
        [HttpPost]
        public void UpdatePerson(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Edit(person);
        }
    }
}
