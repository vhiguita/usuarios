package users.test.service;

import java.util.List;
import java.util.Optional;
import users.test.model.Usuario;

public interface UsuarioService {
	public List<Usuario> findAllUsers();

	public Optional<Usuario> findUserById(Long id);
	
	public Optional<Usuario> findUserByNombreIs(String nombre);

	public Usuario saveUser(Usuario nuevoUsuario);

	public String deleteUser(Long id);

	public String updateUser(Usuario nuevoUsuario);

}
