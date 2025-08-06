import React from "react";

const ChildSafety = () => {
  const safetyFeatures = [
    {
      icon: "👥",
      title: "Parental Controls",
      description: "Complete oversight and control over your child's digital experience",
      features: ["Screen time limits", "Content filtering", "Activity monitoring", "Purchase controls"]
    },
    {
      icon: "🔒",
      title: "Data Privacy",
      description: "Your child's information is protected with industry-leading security",
      features: ["COPPA compliant", "Encrypted data", "No third-party sharing", "Secure storage"]
    },
    {
      icon: "🛡️",
      title: "Safe Content",
      description: "All content is carefully curated and age-appropriate",
      features: ["Educational focus", "No violence", "Positive messaging", "Expert reviewed"]
    },
    {
      icon: "✅",
      title: "Verified Tutors",
      description: "Every tutor undergoes thorough background checks and certification",
      features: ["Background checks", "Identity verification", "Certification required", "Ongoing monitoring"]
    }
  ];

  const certifications = [
    {
      name: "COPPA Certified",
      description: "Children's Online Privacy Protection Act compliant",
      icon: "🏆"
    },
    {
      name: "FERPA Compliant",
      description: "Educational records privacy protection",
      icon: "📚"
    },
    {
      name: "ISO 27001",
      description: "Information security management certified",
      icon: "🔐"
    },
    {
      name: "SOC 2 Type II",
      description: "Security, availability, and confidentiality audited",
      icon: "🛡️"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Your Child's Safety is Our Priority
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We've built comprehensive safety measures to ensure your child has a secure, positive, and educational digital experience
            </p>
          </div>

          {/* Safety Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {safetyFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 border border-white/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl" role="img" aria-label={feature.title}>
                    {feature.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-blue-100 mb-4 text-sm">{feature.description}</p>
                  
                  {/* Features List */}
                  <ul className="space-y-1 text-xs text-blue-200">
                    {feature.features.map((item) => (
                      <li key={item} className="flex items-center justify-center">
                        <span className="w-1 h-1 bg-blue-300 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Safety Commitment */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Our Safety Commitment</h3>
                <div className="space-y-4 text-blue-100">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <p>
                      <strong className="text-white">Zero Tolerance Policy:</strong> We maintain strict guidelines against inappropriate content, bullying, or unsafe interactions.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <p>
                      <strong className="text-white">24/7 Monitoring:</strong> Our AI-powered systems and human moderators work around the clock to ensure platform safety.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <p>
                      <strong className="text-white">Transparent Reporting:</strong> Parents receive detailed activity reports and can instantly block or report any concerning behavior.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <p>
                      <strong className="text-white">Educational Focus:</strong> Every piece of content is designed to be educational, positive, and developmentally appropriate.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Safety Stats */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-xl font-bold mb-6 text-center">Safety by the Numbers</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                    <div className="text-sm text-blue-200">Content Reviewed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                    <div className="text-sm text-blue-200">Safety Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">0</div>
                    <div className="text-sm text-blue-200">Data Breaches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                    <div className="text-sm text-blue-200">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8">Industry Certifications & Compliance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <div className="text-2xl mb-2" role="img" aria-label={cert.name}>
                    {cert.icon}
                  </div>
                  <div className="font-bold text-sm mb-1">{cert.name}</div>
                  <div className="text-xs text-blue-200">{cert.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact for Safety Concerns */}
          <div className="mt-16 text-center">
            <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-6 max-w-2xl mx-auto">
              <h4 className="text-xl font-bold mb-3 text-red-100">Safety Concerns?</h4>
              <p className="text-red-200 mb-4">
                If you ever have safety concerns or need to report an issue, our safety team is available 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:safety@kidsplay.com"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Report Safety Issue
                </a>
                <a
                  href="tel:1-800-KIDSSAFE"
                  className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  Call Safety Hotline
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChildSafety;