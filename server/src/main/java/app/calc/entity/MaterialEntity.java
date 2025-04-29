package app.calc.entity;

import app.calc.utils.UnitOfMeasurement;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "materials")
public class MaterialEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "uom")
    @Enumerated(EnumType.STRING)
    private UnitOfMeasurement uom;

    @Column(name = "price")
    private double price;

    @OneToMany(mappedBy = "id")
    @JsonIgnore
    private Set<BOMLineEntity> bomLines;

    public MaterialEntity() {
    }

    public MaterialEntity(String name, String description, UnitOfMeasurement uom, double price) {
        this.name = name;
        this.description = description;
        this.uom = uom;
        this.price = price;
    }

    public MaterialEntity(long id, String name, String description, UnitOfMeasurement uom, double price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.uom = uom;
        this.price = price;
    }

    public long getID() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public UnitOfMeasurement getUOM() {
        return uom;
    }

    public double getPrice() {
        return price;
    }

    public Set<BOMLineEntity> getBomLines() {
        return bomLines;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUOM(UnitOfMeasurement uom) {
        this.uom = uom;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setBomLines(Set<BOMLineEntity> bomLines) {
        this.bomLines = bomLines;
    }

    @Override
    public String toString() {
        return String.format("materials {id: %d, name: %s, description: %s, uom: %s, price: %.3f}",
                this.id, this.name, this.description, this.uom, this.price);
    }
}
