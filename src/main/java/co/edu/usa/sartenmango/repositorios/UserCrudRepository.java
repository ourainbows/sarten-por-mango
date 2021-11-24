package co.edu.usa.sartenmango.repositorios;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import co.edu.usa.sartenmango.entidades.User;

public interface UserCrudRepository extends CrudRepository<User,Long>{
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);
}
