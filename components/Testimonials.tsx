import Image from "next/image";

const reviews = [
  { name: "Bill Quilty", rating: 5, text: "Losing someone you love is never easy, and the aftermath can be devastating. Adam made the selling of my sister's condo as smooth as silk. No haggling, honest and upfront about what he was willing to pay. Can I give him another 5 stars?" },
  { name: "Tina Nascembeni", rating: 5, text: "I would highly recommend working with Adam. While assisting a friend sell his home of over 40 years, Adam and his team provided the best cash offer right from the start. Adam provided great communication and answered all questions we had without hesitation. Truly a great experience - 'take what you need, leave behind what you don't' was a great added benefit. You can't go wrong with Adam!" },
  { name: "Justin Provost", rating: 5, text: "Great team. Had a cash offer in a day. Closed in a timeline that I needed. Professional and responsive. Highly recommend." },
  { name: "Amy Blascak", rating: 5, text: "I met with Adam and had an amazing conversation where he outlined many different scenarios that I could do. I truly felt like he had my best interest at heart. Adam Rovithis is one of a kind." },
  { name: "Kris Cook", rating: 5, text: "Adam is truly one of the last honest guys out there trying to help people and he comes from a place of contribution. I have assisted Adam with a few of his purchases where a house needed lots of work and I called Adam and he came in and helped the home owners see that there was a way out for them. It's a pleasure to work with Adam. You will not be disappointed you did!" },
  { name: "Karli Lajeunesse", rating: 5, text: "I met Adam with my mom. There was a family that needed to get out of their home to move away to be with family. Adam made that possible with making it a seamless process!!" },
  { name: "Adam Lajeunesse", rating: 5, text: "I have watched Adam do dozens of cash and carry deals over the years, and he lets the owner take what they want and they can leave the rest. It doesn't get any easier! Every step of the way, you can tell Adam cares deeply about making sure you are taken care of and treated well." },
  { name: "Azik Gamidov", rating: 5, text: "Working with Adam was amazing. He helped my clients get into a house they absolutely adore. I hope we can work together again!" },
  { name: "Amanda Berube", rating: 5, text: "I've had the pleasure of working with Adam on multiple occasions and it is always a great experience. He is personable, professional, reliable, and fair. I would recommend him to anyone!" },
  { name: "Kristina Adamyan", rating: 5, text: "I had a fantastic experience working with Adam. Communication was seamless, and the property, renovated and remodeled by his team, exceeded expectations. A smooth and successful process overall. Highly recommend!" },
  { name: "Ashley Lewis", rating: 5, text: "I had the pleasure of working with Adam a lot and it has always been a phenomenal experience! I have worked with him on numerous purchases and each experience has been uncomplicated and professional. Adam is extremely communicative and understanding. I would absolutely recommend working with him. 10/10 experience each time!" },
  { name: "Sonia Cavanaugh", rating: 5, text: "I am glad I decided to sell with Adam. It was easy and very un stressful. I would recommend to all my friends." },
  { name: "Jennifer Taylor", rating: 5, text: "Had a great experience working with Adam and Sell to Adam. Would recommend to others!" },
  { name: "Brendan Ennis", rating: 5, text: "I purchased a home from Adam last year. I was very impressed with his knowledge of the industry which was key as this was my first home. It was a newly renovated property with a good amount of work done by Adam and his crew. I was impressed by the quality of the renovations at the time and months later, I couldn't be happier. The work that was done is built to last. Adam made the process very simple and stress free. Highly recommended." },
  { name: "Kiara O'Brien", rating: 5, text: "My husband and I started the home buying process in April of 2023. By May of 2023 we were under contract!! We worked with Adam on a home that he was in the process of renovating and we are so happy we did. It had everything we were looking for and more! Adam is honest and trustworthy. With the renovations we got quality appliances in the newly renovated kitchen AND bathrooms. He was very straightforward about the process and did everything right away! I HIGHLY recommend working with Adam when you're looking for your next home!!" },
  { name: "Franklyn James", rating: 5, text: "Adam is awesome!! He made the process easy and understandable. He also gave me lots of advice, suggestions, and was polite and professional. I HIGHLY recommend Adam and his team!" },
  { name: "Martha Alvarado", rating: 5, text: "Adam came to my home with his contractor, and after assessing what was going on in my home he was able to provide me with some valuable information on what I needed to do to get the best dollar for what I had. He also provided me with other alternatives. His honesty is a gem among stones. When I'm ready to sell I will definitely be going back to Adam." },
  { name: "Debora Winiarski", rating: 5, text: "My husband and I needed to sell our house quickly, so we called Adam. He came over the next day. Adam viewed our property and the next day made a fair price and guided us through the process of selling. He's not just your average 'house flipper', he cares about you. He treated us like family. I was so impressed!! Please make that first call to Sell to Adam. He is class all the way. Big thumbs up and five stars!!" },
  { name: "Harriet Cook", rating: 5, text: "Adam was awesome he did everything he said he would do. Explained everything to us. Made selling the home very easy and stress free." },
  { name: "Peter Appleby", rating: 5, text: "Adam was super responsive and easy to deal with. Quick responses and fair offers! Have recommended to many family and friends." },
  { name: "Mike Fields", rating: 5, text: "Adam came to my property on time and was very professional! Gave me a fair price and shared a wealth of knowledge which makes me feel very comfortable and confident in my decision to move forward. Strongly recommend his services. Sell to Adam!!" },
  { name: "Kimberly Robinson Williams", rating: 5, text: "Adam replied to my call immediately and was at my house for a walk through within a week. He provided a fair and well educated offer within a few days. He talked me through two different options for selling my house. I ultimately chose not to sell right now, and Adam still offered advice about what I should do when I'm ready in order to get the highest sale price. When I'm ready to sell, I'll definitely call him!" },
  { name: "Seven Roads Media", rating: 5, text: "Adam is without a doubt a master of his business. Every single home we have ever seen from Adam is beautiful, thoughtful and professional. Adam not only treats people with an abundance of kindness but will go the extra mile to help in any way he can. Don't think twice - choose Adam!" },
  { name: "Don Cavanaugh", rating: 5, text: "Our media team has worked with Adam and his team on all his projects, and we are always impressed with his knowledge, friendliness, and attention to detail. Adam is always super responsive, and it's evident that he is genuinely interested in providing the best service to his clients and vendors. We are always excited to work with Adam and his team!" },
  { name: "Jacqui Copperwheat", rating: 5, text: "Adam made it very easy for us to sell our parents house during an emotional time. We received a fair price. He also was good about communicating and assisting us through out the process. I would strongly recommend 'Sell to Adam'." },
  { name: "Judith Podmore", rating: 5, text: "Adam provided a great solution! I needed to move my parents to a one level living but their older home was in need of lots of work, not ideal for conventional sale. He promptly accessed the house and gave a fair price as well as explained in detail the process and prepared us well on what to expect. He was extremely accommodating. I'd highly recommend Adam." },
  { name: "Melissa Ogulewicz", rating: 5, text: "I referred one of my clients to Adam and they could not have been happier with the process. Adam kept his original price and closing date which made it easy for my Sellers to plan the move into their new place. Reliable, courteous and professional. Really couldn't say anything better - highly recommend!" },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} star rating`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i <= rating ? "text-brand-gold" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ limit }: { limit?: number }) {
  const displayed = limit ? reviews.slice(0, limit) : reviews;

  return (
    <section className="bg-brand-gray py-16 md:py-20">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <p className="section-label">TESTIMONIALS</p>
          <h2 className="section-heading mt-2">
            Our Clients Love Working With Us, So Will You!
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {displayed.map((review, i) => (
            <div
              key={`${review.name}-${i}`}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-brand-dark">{review.name}</h3>
                <Image
                  src="/google-reviews.webp"
                  alt="Google Reviews"
                  width={80}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed flex-1">
                {review.text}
              </p>
              <div className="mt-4">
                <Stars rating={review.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
