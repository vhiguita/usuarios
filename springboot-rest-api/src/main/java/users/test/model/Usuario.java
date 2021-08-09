package users.test.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_usuario")

public class Usuario {
	public Usuario(){

	}
	public Usuario(Long idUsuario, Long idRol,  String nombre, String activo) {
        super();
        this.idUsuario = idUsuario;
        this.idRol = idRol;
        this.nombre = nombre;
        this.activo = activo;
    }
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_usuario")
	private Long idUsuario;
	@Column(name="id_rol")
	private Long idRol;
	@Column(name="nombre")
    private String nombre;
	@Column(name="activo")
    private String activo;

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }
    public Long getIdRol() {
    	return idRol;
    }
    
    public void setIdRol(Long idRol) {
        this.idRol = idRol;
    }
    
    public String getNombre() {
    	return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getActivo() {
        return activo;
    }

    public void setActivo(String activo) {
        this.activo = activo;
    }

    @Override
    public String toString() {
        return "Usuario [idUsuario=" + idUsuario + ", idRol=" + idRol + ", nombre=" + nombre + ", activo=" + activo + "]";
    }

}
