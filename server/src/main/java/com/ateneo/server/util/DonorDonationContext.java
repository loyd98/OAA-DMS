package com.ateneo.server.util;

import com.ateneo.server.domain.Donation;
import lombok.Data;

@Data
public class DonorDonationContext {
    private Long id;
    private Donation donation;
}
