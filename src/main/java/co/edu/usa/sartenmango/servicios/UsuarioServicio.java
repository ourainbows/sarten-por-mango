package co.edu.usa.sartenmango.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.usa.sartenmango.entidades.User;
import co.edu.usa.sartenmango.repositorios.UserRepository;

@Service
public class UsuarioServicio {
    @Autowired
    private UserRepository userRepositorio;
    
    public List<User> getAllUsers() {
        return userRepositorio.getUsers();
    }

    public Optional<User> getUser(Long id) {
        return userRepositorio.getUserPorId(id);
    }

    public User saveUser(User user) {
      if (user.getId() == null) {
            if (existeEmail(user.getEmail()) == false) {
                return userRepositorio.guardarUser(user);
            } else {
                return user;
            }
        } else {
            return user;
        }
    }
    
    public boolean existeEmail(String email) {
        return userRepositorio.existeEmail(email);
    }

    public User autenticarUsuario(String email, String password) {
        Optional<User> usuario = userRepositorio.autenticarUsuario(email, password);

        if (usuario.isEmpty()) {
            return new User(email, password, "NO DEFINIDO");
        } else {
            return usuario.get();
        }
    }
}