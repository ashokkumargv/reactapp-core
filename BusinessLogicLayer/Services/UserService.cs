using AutoMapper;
using BusinessLogicLayer.Interfaces;
using BusinessLogicLayer.Models;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;

namespace BusinessLogicLayer.Services;

public class UserService:IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
        _mapper = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<User, UserListModel>();

        }).CreateMapper();
    }

    public async Task<IEnumerable<UserListModel>> GetUsersAsync()
    {
        var users = await _userRepository.GetUsersAsync();
        return  users.Select(_mapper.Map<UserListModel>).ToList();
    }
}