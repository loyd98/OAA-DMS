package com.ateneo.server.controller;

import com.ateneo.server.domain.AuthRequest;
import com.ateneo.server.domain.User;
import com.ateneo.server.repository.UserRepository;
import com.ateneo.server.service.CustomUserDetailsService;
import com.ateneo.server.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
public class AuthController {

    private final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userService;

    @PostMapping("/register")
    public String registerNewUser(@RequestBody User user, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            logger.info("Validation errors were found while registering a new user");
//            model.addAttribute("user",user);
//            model.addAttribute("validationErrors", bindingResult.getAllErrors());
            return "auth/register";
        } else {
            // Register new user
            User newUser = userService.register(user);
            redirectAttributes
                    .addAttribute("id", newUser.getId())
                    .addFlashAttribute("success", true);
            return "redirect:/register";
        }
    }

    @PostMapping("/authenticate")
    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            UserDetails user = customUserDetailsService.loadUserByUsername(authRequest.getUsername());

            if (!encoder.matches(authRequest.getPassword(), user.getPassword().replace("{bycrypt}", ""))) {
                throw new Exception("Invalid username or password");
            }
        } catch (Exception ex) {
            throw new Exception("Invalid username or password");
        }

        return jwtUtil.generateToken(authRequest.getUsername());
    }
}
