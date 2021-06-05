package com.ateneo.server.service;

import com.ateneo.server.domain.User;
import com.ateneo.server.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);
    private final BCryptPasswordEncoder encoder;

    public CustomUserDetailsService() {
        encoder = new BCryptPasswordEncoder();
    }

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    public User register(User user) {
        String secret = "{bycrypt}" + encoder.encode(user.getPassword());
        user.setPassword(secret);

        userRepository.save(user);

        return user;
    }

    public List<User> findAllUsersAsc() {
        return userRepository.findAllByOrderByIdAsc();
    }

    public String deleteUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        userRepository.delete(user);
        return "Successfully deleted user with id" + id;
    }
}
