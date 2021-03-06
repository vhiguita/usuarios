package users.test.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_rol")
public class Rol {
	public Rol(){

	}
	public Rol(Integer idRol, String nombre) {
        super();
        this.idRol = idRol;
        this.nombre = nombre;
    }
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_rol")
    Integer idRol;
	@Column(name="nombre")
    String nombre;


    public Integer getIdRol() {
        return idRol;
    }

    public void setIdRol(Integer idRol) {
        this.idRol = idRol;
    }

    public String getNombre() {
        return nombre;
    }

    public void setProduct(String nombre) {
        this.nombre = nombre;
    }


    @Override
    public String toString() {
        return "Rol [idRol=" + idRol + ", nombre=" + nombre + "]";
    }
}
