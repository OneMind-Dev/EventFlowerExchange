package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.CommentRequest;
import fu.gr2.EcommerceProject.dto.response.CommentResponse;
import fu.gr2.EcommerceProject.entity.Event;
import fu.gr2.EcommerceProject.entity.Review;
import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.exception.AppException;
import fu.gr2.EcommerceProject.exception.ErrorCode;
import fu.gr2.EcommerceProject.repository.EventRepository;
import fu.gr2.EcommerceProject.repository.ReviewRepository; // Assuming you have a repository layer
import fu.gr2.EcommerceProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
    public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public ApiResponse<CommentResponse> addComment(Integer eventId, CommentRequest commentRequest) {
        // Validate and find the event
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_EXISTED));

        // Validate and find the user
        User user = userRepository.findById(commentRequest.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Create and save the review
        Review review = new Review();
        review.setEvent(event);
        review.setUser(user);
        review.getComments().add(commentRequest.getComment());

        Review savedReview = reviewRepository.save(review);

        // Create the simplified response
        CommentResponse commentResponse = new CommentResponse(
                savedReview.getReviewID(),
                savedReview.getComments(),
                savedReview.getCreatedAt().toString() // Format as needed
        );

        String successMessage = "Comment added successfully to Event ID: " + eventId;

        return ApiResponse.<CommentResponse>builder()
                .result(commentResponse)
                .message(successMessage)
                .build();
    }
    public ApiResponse<Review> updateComment(Integer reviewId, CommentRequest commentRequest) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_EXISTED));

        // Update the comments list
        review.getComments().clear(); // Clear existing comments if necessary
        review.getComments().add(commentRequest.getComment());

        // Save the updated review
        Review updatedReview = reviewRepository.save(review);
        String successMessage = "Comment updated successfully for Review ID: " + reviewId;

        return ApiResponse.<Review>builder()
                .result(updatedReview)
                .message(successMessage)
                .build();
    }

    public ApiResponse<Void> deleteComment(Integer reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_EXISTED));

        reviewRepository.delete(review);
        String successMessage = "Comment deleted successfully for Review ID: " + reviewId;

        return ApiResponse.<Void>builder()
                .message(successMessage)
                .build();
    }

    public List<Review> getCommentsForEvent(Integer eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_EXISTED));

        return reviewRepository.findByEvent(event);
    }

    public Review getCommentById(Integer reviewId) {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_EXISTED));
    }

//    public List<Review> getReviewsByUserId(User user) {
//        return reviewRepository.findByUser(user);
//    }
}