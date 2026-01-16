using Server.Models;

namespace Server.Repositories
{
    public interface ILegoRepository
    {
        IEnumerable<LegoSet> GetAll();
        void Add(LegoSet legoSet);
        void Delete(int id);
    }
}