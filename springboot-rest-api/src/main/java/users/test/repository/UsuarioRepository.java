package users.test.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import users.test.model.Usuario;


public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	void save(Optional<Usuario> userToUpdate);
	public Optional<Usuario> findUserByNombreIs(String nombre);
}