package js.footballclubmng.service;

import js.footballclubmng.model.RequestModel.RegisterRequestModel;

public interface UserService {
    public String addUser(RegisterRequestModel request);
}