package users.test.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import users.test.model.Rol;

public interface RolRepository extends JpaRepository<Rol, Long>{

}
