// ============================================
// FILE: src/seed.ts
// ============================================
import { db } from './config/db';
import { tags } from './models/schema';

/**
 * Seed the tags table with tech-related expertise areas
 * These tags will be used by mentors to indicate their areas of expertise
 * 
 * This function is idempotent - safe to run multiple times
 */
async function seedTags() {
  try {
    console.log('🌱 Starting to seed tags...');

    // Define 36+ high-level tech expertise areas
    const tagNames = [
      // AI & Machine Learning
      'Artificial Intelligence',
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Reinforcement Learning',

      // Data & Analytics
      'Data Science',
      'Data Analytics',
      'Data Engineering',
      'Big Data',
      'Business Intelligence',
      'Data Visualization',

      // Cloud & Infrastructure
      'Cloud Computing',
      'Amazon Web Services (AWS)',
      'Microsoft Azure',
      'Google Cloud Platform',
      'DevOps',
      'Kubernetes',
      'Docker',

      // Software Development
      'Web Development',
      'Frontend Development',
      'Backend Development',
      'Full Stack Development',
      'Mobile Development',
      'iOS Development',
      'Android Development',

      // Programming & Frameworks
      'Python',
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'Java',

      // Fintech & Banking
      'Financial Technology',
      'Banking Technology',
      'Blockchain',
      'Cryptocurrency',
      'Payment Systems',

      // E-commerce & Digital
      'E-commerce',
      'Digital Marketing',
      'SEO & SEM',
      'Product Management',

      // Agile & Management
      'Scrum',
      'Agile Methodology',
      'Project Management',
      'Technical Leadership',

      // Security & Quality
      'Cybersecurity',
      'Software Testing',
      'Quality Assurance',

      // Design & UX
      'UI/UX Design',
      'Product Design',
    ];

    console.log(`📝 Checking ${tagNames.length} tags...`);

    // Get all existing tags from the database
    const existingTags = await db.select().from(tags);
    const existingTagNames = new Set(existingTags.map(tag => tag.name));

    // Filter out tags that already exist
    const newTagNames = tagNames.filter(name => !existingTagNames.has(name));

    if (newTagNames.length === 0) {
      console.log('✅ All tags already exist in the database. No new tags to insert.');
      console.log(`📊 Total tags in database: ${existingTags.length}`);
      process.exit(0);
    }

    console.log(`🆕 Found ${newTagNames.length} new tags to insert`);
    console.log(`📊 Existing tags: ${existingTags.length}`);

    // Insert only the new tags
    const insertedTags = await db
      .insert(tags)
      .values(newTagNames.map(name => ({ name })))
      .returning();

    console.log(`✅ Successfully inserted ${insertedTags.length} new tags into the database`);
    
    // Display newly inserted tags
    if (insertedTags.length > 0) {
      console.log('\n📋 Newly inserted tags:');
      insertedTags.forEach((tag, index) => {
        console.log(`   ${index + 1}. ${tag.name} (ID: ${tag.id})`);
      });
    }

    // Get updated count
    const finalTags = await db.select().from(tags);
    console.log(`\n📊 Total tags in database: ${finalTags.length}`);
    console.log('🎉 Tag seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding tags:', error);
    process.exit(1);
  }
}

// Run the seed function
seedTags();