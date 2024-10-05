package fu.gr2.EcommerceProject.mapper;

import fu.gr2.EcommerceProject.dto.response.FlowerResponse;
import fu.gr2.EcommerceProject.entity.Flower;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class FlowerMapperImpl implements FlowerMapper {

    @Override
    public FlowerResponse toFlowerResponse(Flower flower) {
        if ( flower == null ) {
            return null;
        }

        FlowerResponse.FlowerResponseBuilder flowerResponse = FlowerResponse.builder();

        if ( flower.getFlowerId() != null ) {
            flowerResponse.flowerId( flower.getFlowerId().toString() );
        }
        flowerResponse.flowerName( flower.getFlowerName() );
        flowerResponse.origin( flower.getOrigin() );
        flowerResponse.color( flower.getColor() );

        return flowerResponse.build();
    }
}
