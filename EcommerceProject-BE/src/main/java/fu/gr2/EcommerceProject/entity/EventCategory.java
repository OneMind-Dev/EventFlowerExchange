package fu.gr2.EcommerceProject.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "EventCategory")
public class EventCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Category_id")
    private UUID id;
    @Column(name= "Category_name")
    private String name;
    public EventCategory() {}

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
