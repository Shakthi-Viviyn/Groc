package com.groc.backend.service;

import com.groc.backend.model.dto.CategorizationDto;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class CategorizationApiService {

    private final WebClient webClient;

    public CategorizationApiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:8000").build();
    }

    public List<CategorizationDto> getCategoriesForProducts(List<CategorizationDto> productNames) {
        return webClient
                .post()
                .uri("/categorize")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(productNames)
                .retrieve()
                .onStatus(HttpStatusCode::isError, clientResponse -> {
                    return Mono.error(new RuntimeException("Categorization API call failed with status code " + clientResponse.statusCode())); // Simple exception
                })
                .bodyToMono(new ParameterizedTypeReference<List<CategorizationDto>>() {})
                .block();
    }


}
