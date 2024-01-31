package js.footballclubmng.controller;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class UserController {
    @Autowired
    UserRepository userRepository;


    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }
}

