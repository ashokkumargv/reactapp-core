using BusinessLogicLayer.Models;

namespace BusinessLogicLayer.Interfaces;

public interface IUserService
{
    Task<IEnumerable<UserListModel>> GetUsersAsync();
}