using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleWithBackend.Data
{
    public class PersonRepository
    {
        private string _connectionString;

        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }

        public void AddPerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void Edit(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Update(person);
            context.SaveChanges();
        }

        public void DeletePerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            var person = context.People.Find(id);
            if (person != null)
            {
                context.People.Remove(person);
                context.SaveChanges();
            }
        }

        public void DeleteMultiplePeople(List<int> ids)
        {
            using var context = new PeopleDataContext(_connectionString);
            var people = context.People.Where(p => ids.Contains(p.Id)).ToList();
            context.People.RemoveRange(people);
            context.SaveChanges();
        }
    }
}
