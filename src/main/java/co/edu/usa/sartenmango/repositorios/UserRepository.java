package co.edu.usa.sartenmango.repositorios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.edu.usa.sartenmango.entidades.User;

/**
 * Creamos el CRUD
 */
@Repository
public class UserRepository {
    @Autowired 
    private UserCrudRepository userRepositorio;

    /**
     * GET
     * @return
     */
    public List<User> getUsers() {
        return (List<User>) userRepositorio.findAll();
    }
    
    /**
     * GET BY ID
     * @param idUsuario
     * @return
     */
    public Optional<User> getUserPorId(Long idUser) {
        return userRepositorio.findById(idUser);
    }
    
    /**
     * CREATE - UPDATE
     * @param idUser
     * @return
     */
    public User guardarUser(User user) {
        return userRepositorio.save(user);
    }
    
    /**
     * DELETE
     * @param user
     */
    public void boorarUser(User user) {
        userRepositorio.delete(user);
    }
    
    public boolean existeEmail(String email) {
        Optional<User> usuario = userRepositorio.findByEmail(email);
        return !usuario.isEmpty();
    }

    public Optional<User> autenticarUsuario(String email, String password) {
        return userRepositorio.findByEmailAndPassword(email, password);
    }

}
