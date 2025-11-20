// ============================================
// FILE: src/seed.ts
// ============================================
import { db } from './config/db';
import { 
  users, 
  mentorProfiles, 
  tags, 
  mentorExpertise, 
  availabilities 
} from './models/schema';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

// Configuration
const TOTAL_USERS = 50;
const TOTAL_MENTORS = 30;
const TOTAL_MENTEES = TOTAL_USERS - TOTAL_MENTORS;
const SHARED_PASSWORD = 'password123';
const AVAILABILITIES_PER_MENTOR = 5;

// Tech companies for job titles
const TECH_COMPANIES = [
  'Google', 'Microsoft', 'Meta', 'Amazon', 'Apple', 'Netflix', 'Tesla',
  'Uber', 'Airbnb', 'Shopify', 'Stripe', 'Spotify', 'LinkedIn', 'Adobe',
  'Oracle', 'SAP', 'Salesforce', 'FPT Software', 'VNG Corporation', 'Viettel'
];

// Job positions
const JOB_POSITIONS = [
  'Senior Software Engineer', 'Lead Developer', 'Tech Lead',
  'Senior Data Scientist', 'Machine Learning Engineer', 'Senior Product Manager',
  'Principal Engineer', 'Engineering Manager', 'Senior DevOps Engineer',
  'Senior Frontend Developer', 'Senior Backend Developer', 'Full Stack Architect'
];

/**
 * Generate hashed password for all users
 */
async function getHashedPassword(): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(SHARED_PASSWORD, salt);
}

/**
 * Generate professional avatar URL
 */
function generateAvatarUrl(index: number): string {
  // Mix of male and female professional avatars
  const gender = index % 2 === 0 ? 'men' : 'women';
  const id = (index % 99) + 1;
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
}

/**
 * Generate realistic mentor bio
 */
function generateMentorBio(jobTitle: string, company: string, expertise: string[]): string {
  const years = faker.number.int({ min: 3, max: 12 });
  const bios = [
    `${years}+ years of experience as a ${jobTitle} at ${company}. Specialized in ${expertise.slice(0, 2).join(' and ')}. I help students build practical skills and navigate their tech careers. In our sessions, you'll gain hands-on experience and industry insights to accelerate your learning journey.`,
    
    `Passionate ${jobTitle} at ${company} with ${years} years in the industry. Expert in ${expertise.slice(0, 2).join(', ')}. I focus on mentoring students to develop real-world projects and problem-solving skills. Book a session to get personalized guidance and career advice from someone who's been in your shoes.`,
    
    `Currently working as ${jobTitle} at ${company} for ${years} years. Deep expertise in ${expertise.slice(0, 2).join(' & ')}. I enjoy sharing knowledge with aspiring developers and helping them overcome technical challenges. Let's work together to boost your skills and confidence in the tech field.`
  ];
  
  return bios[Math.floor(Math.random() * bios.length)];
}

/**
 * Generate student-friendly hourly rate (50k - 500k VND)
 */
function generateHourlyRate(): string {
  const rates = [
    // Junior mentors (Fresh grads, 1-2 years)
    ...Array(10).fill(null).map(() => faker.number.int({ min: 50000, max: 150000 })),
    // Mid-level (3-5 years)
    ...Array(10).fill(null).map(() => faker.number.int({ min: 150000, max: 300000 })),
    // Senior (5+ years)
    ...Array(10).fill(null).map(() => faker.number.int({ min: 300000, max: 500000 }))
  ];
  
  return rates[Math.floor(Math.random() * rates.length)].toString();
}

/**
 * Generate realistic rating and review count
 */
function generateRatingAndReviews(): { rating: string; reviews: number } {
  const reviews = faker.number.int({ min: 5, max: 50 });
  // Higher reviews tend to have better ratings
  const minRating = reviews > 30 ? 4.0 : reviews > 15 ? 3.5 : 3.0;
  const rating = faker.number.float({ min: minRating, max: 5.0, fractionDigits: 2 });
  
  return {
    rating: rating.toString(),
    reviews
  };
}

/**
 * Seed users table
 */
async function seedUsers(passwordHash: string) {
  console.log(`\n👥 Seeding ${TOTAL_USERS} users...`);
  
  const existingUsers = await db.select().from(users);
  if (existingUsers.length >= TOTAL_USERS) {
    console.log(`✅ Already have ${existingUsers.length} users. Skipping user seeding.`);
    return existingUsers;
  }

  const usersToCreate = [];
  
  // Create mentors
  for (let i = 1; i <= TOTAL_MENTORS; i++) {
    usersToCreate.push({
      name: faker.person.fullName(),
      email: `mentor${i}@careerlink.com`,
      passwordHash,
      avatarUrl: generateAvatarUrl(i),
      role: 'mentor',
      authProvider: 'email',
    });
  }
  
  // Create mentees
  for (let i = 1; i <= TOTAL_MENTEES; i++) {
    usersToCreate.push({
      name: faker.person.fullName(),
      email: `mentee${i}@careerlink.com`,
      passwordHash,
      avatarUrl: generateAvatarUrl(i + TOTAL_MENTORS),
      role: 'mentee',
      authProvider: 'email',
    });
  }

  const insertedUsers = await db.insert(users).values(usersToCreate).returning();
  console.log(`✅ Created ${insertedUsers.length} users`);
  
  return insertedUsers;
}

/**
 * Seed tags table
 */
async function seedTags() {
  console.log('\n🏷️  Seeding tags...');

  const tagNames = [
    // Programming Languages
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++',
    
    // Web Development
    'React', 'Node.js', 'Frontend Development', 'Backend Development', 
    'Full Stack Development', 'Web Development',
    
    // Data & AI
    'Data Science', 'Machine Learning', 'Artificial Intelligence',
    'Deep Learning', 'Data Analytics',
    
    // Cloud & DevOps
    'Cloud Computing', 'AWS', 'Azure', 'DevOps', 'Docker', 'Kubernetes',
    
    // Mobile & Design
    'Mobile Development', 'iOS Development', 'Android Development',
    'UI/UX Design', 'Product Design',
    
    // Other
    'Blockchain', 'Cybersecurity', 'Agile Methodology', 'Product Management'
  ];

  const existingTags = await db.select().from(tags);
  const existingTagNames = new Set(existingTags.map(tag => tag.name));
  const newTagNames = tagNames.filter(name => !existingTagNames.has(name));

  if (newTagNames.length === 0) {
    console.log(`✅ All ${existingTags.length} tags already exist`);
    return existingTags;
  }

  const insertedTags = await db
    .insert(tags)
    .values(newTagNames.map(name => ({ name })))
    .returning();

  console.log(`✅ Created ${insertedTags.length} new tags`);
  
  const allTags = await db.select().from(tags);
  return allTags;
}

/**
 * Seed mentor profiles
 */
async function seedMentorProfiles(allUsers: any[], allTags: any[]) {
  console.log(`\n👔 Seeding mentor profiles...`);
  
  const mentors = allUsers.filter(u => u.role === 'mentor');
  
  const existingProfiles = await db.select().from(mentorProfiles);
  if (existingProfiles.length >= mentors.length) {
    console.log(`✅ Already have ${existingProfiles.length} mentor profiles`);
    return existingProfiles;
  }

  const profilesToCreate = [];
  
  for (const mentor of mentors) {
    const company = TECH_COMPANIES[Math.floor(Math.random() * TECH_COMPANIES.length)];
    const position = JOB_POSITIONS[Math.floor(Math.random() * JOB_POSITIONS.length)];
    const jobTitle = `${position} at ${company}`;
    
    // Random expertise tags (2-5 tags per mentor)
    const numTags = faker.number.int({ min: 2, max: 5 });
    const shuffled = [...allTags].sort(() => 0.5 - Math.random());
    const mentorTags = shuffled.slice(0, numTags);
    const expertiseNames = mentorTags.map((t: any) => t.name);
    
    const { rating, reviews } = generateRatingAndReviews();
    const hourlyRate = generateHourlyRate();
    const bio = generateMentorBio(jobTitle, company, expertiseNames);
    
    profilesToCreate.push({
      userId: mentor.id,
      bio,
      jobTitle,
      hourlyRate,
      averageRating: rating,
      totalReviews: reviews
    });
  }

  const insertedProfiles = await db
    .insert(mentorProfiles)
    .values(profilesToCreate)
    .returning();

  console.log(`✅ Created ${insertedProfiles.length} mentor profiles`);
  
  return insertedProfiles;
}

/**
 * Seed mentor expertise (link mentors with tags)
 */
async function seedMentorExpertise(mentorProfilesList: any[], allTags: any[]) {
  console.log(`\n🔗 Seeding mentor expertise links...`);
  
  const existingLinks = await db.select().from(mentorExpertise);
  if (existingLinks.length > 0) {
    console.log(`✅ Already have ${existingLinks.length} expertise links`);
    return existingLinks;
  }

  const linksToCreate = [];
  
  for (const profile of mentorProfilesList) {
    // Each mentor gets 2-5 random tags
    const numTags = faker.number.int({ min: 2, max: 5 });
    const shuffled = [...allTags].sort(() => 0.5 - Math.random());
    const selectedTags = shuffled.slice(0, numTags);
    
    for (const tag of selectedTags) {
      linksToCreate.push({
        mentorId: profile.userId,
        tagId: tag.id
      });
    }
  }

  const insertedLinks = await db
    .insert(mentorExpertise)
    .values(linksToCreate)
    .returning();

  console.log(`✅ Created ${insertedLinks.length} mentor-tag links`);
  
  return insertedLinks;
}

/**
 * Seed availabilities for mentors
 */
async function seedAvailabilities(mentorProfilesList: any[]) {
  console.log(`\n📅 Seeding availability slots...`);
  
  const existingAvailabilities = await db.select().from(availabilities);
  if (existingAvailabilities.length > 0) {
    console.log(`✅ Already have ${existingAvailabilities.length} availability slots`);
    return existingAvailabilities;
  }

  const availabilitiesToCreate = [];
  
  for (const profile of mentorProfilesList) {
    // Each mentor gets 5 availability slots
    for (let i = 0; i < AVAILABILITIES_PER_MENTOR; i++) {
      // Generate future dates (next 14 days)
      const daysAhead = faker.number.int({ min: 1, max: 14 });
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + daysAhead);
      
      // Random hour between 9 AM and 6 PM
      const startHour = faker.number.int({ min: 9, max: 18 });
      startDate.setHours(startHour, 0, 0, 0);
      
      const endDate = new Date(startDate);
      endDate.setHours(startHour + 1); // 1-hour sessions
      
      // Some slots are already booked (20% probability)
      const isBooked = faker.datatype.boolean({ probability: 0.2 });
      
      availabilitiesToCreate.push({
        mentorId: profile.userId,
        startTime: startDate,
        endTime: endDate,
        isBooked
      });
    }
  }

  const insertedAvailabilities = await db
    .insert(availabilities)
    .values(availabilitiesToCreate)
    .returning();

  console.log(`✅ Created ${insertedAvailabilities.length} availability slots`);
  
  return insertedAvailabilities;
}

/**
 * Main seed function
 */
async function runSeed() {
  try {
    console.log('🌱 Starting database seeding...\n');
    console.log('=' .repeat(50));
    
    // 1. Generate password hash
    console.log('🔐 Generating password hash...');
    const passwordHash = await getHashedPassword();
    console.log(`✅ All users will use password: "${SHARED_PASSWORD}"`);
    
    // 2. Seed users
    const allUsers = await seedUsers(passwordHash);
    
    // 3. Seed tags
    const allTags = await seedTags();
    
    // 4. Seed mentor profiles
    const mentorProfilesList = await seedMentorProfiles(allUsers, allTags);
    
    // 5. Seed mentor expertise
    await seedMentorExpertise(mentorProfilesList, allTags);
    
    // 6. Seed availabilities
    await seedAvailabilities(mentorProfilesList);
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   👥 Users: ${TOTAL_USERS} (${TOTAL_MENTORS} mentors, ${TOTAL_MENTEES} mentees)`);
    console.log(`   👔 Mentor Profiles: ${mentorProfilesList.length}`);
    console.log(`   🏷️  Tags: ${allTags.length}`);
    console.log(`   📅 Availability Slots: ${mentorProfilesList.length * AVAILABILITIES_PER_MENTOR}`);
    console.log(`\n🔑 Login credentials:`);
    console.log(`   Mentors: mentor1@careerlink.com to mentor${TOTAL_MENTORS}@careerlink.com`);
    console.log(`   Mentees: mentee1@careerlink.com to mentee${TOTAL_MENTEES}@careerlink.com`);
    console.log(`   Password: ${SHARED_PASSWORD}`);
    console.log('='.repeat(50));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
runSeed();