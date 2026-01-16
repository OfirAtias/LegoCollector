using Server.Models;

namespace Server.Repositories
{
    public class MockLegoRepository : ILegoRepository
    {
        private static List<LegoSet> _legoSets = new List<LegoSet>
        {
            new LegoSet { Id = 1, Name = "Millennium Falcon", Price = 850 },
            new LegoSet { Id = 2, Name = "Hogwarts Castle", Price = 400 },
            new LegoSet { Id = 3, Name = "Rivendell", Price = 500 }
        };

        public IEnumerable<LegoSet> GetAll()
        {
            return _legoSets;
        }

        public void Add(LegoSet legoSet)
        {
            int newId = _legoSets.Any() ? _legoSets.Max(s => s.Id) + 1 : 1;
            legoSet.Id = newId;
            _legoSets.Add(legoSet);
        }

        public void Delete(int id)
        {
            var item = _legoSets.FirstOrDefault(s => s.Id == id);
            if (item != null)
            {
                _legoSets.Remove(item);
            }
        }
    }
}