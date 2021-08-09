package users.test.controllers;

import java.util.List;
import java.util.Optional;
import users.test.model.Usuario;

public interface UsuarioController {
	
	public List<Usuario> getUsers();

	public Optional<Usuario> getUserById(Long id);
	
	public Optional<Usuario> getUserByName(String nombre);

	public Usuario addUsuario(Usuario usuario);

	public String deleteUsuario(Long id);

	public String updateUsuario(Usuario nuevoUsuario);

	public String test();

}
