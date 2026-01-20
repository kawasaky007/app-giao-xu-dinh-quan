"use server";
import { collection, getDocs, query, where, orderBy, doc, getDoc, addDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


export type NewsArticle = {
  id?: string; // Firestore document ID
  slug: string;
  title: string;
  date: string; // Should be ISO string
  author: string;
  category: 'Sự Kiện Giáo Xứ' | 'Phục Vụ Cộng Đoàn' | 'Phụng Vụ' | 'Giáo Dục';
  image: string; // id from placeholder images
  excerpt: string;
  content: string; // HTML content
  status: 'published' | 'draft';
};

function getDb() {
    return initializeFirebase().firestore;
}

// Public-facing functions
export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    const db = getDb();
    const articlesCol = collection(db, 'news');
    const q = query(articlesCol, where('status', '==', 'published'), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
  } catch (e) {
    console.error("Error fetching published articles: ", e);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
  try {
    const db = getDb();
    const articlesCol = collection(db, 'news');
    const q = query(articlesCol, where('slug', '==', slug), where('status', '==', 'published'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return undefined;
    }
    const docData = snapshot.docs[0];
    return { id: docData.id, ...docData.data() } as NewsArticle;
  } catch (e) {
    console.error(`Error fetching article by slug ${slug}: `, e);
    return undefined;
  }
}

export async function getCategories(): Promise<string[]> {
    const articles = await getNewsArticles(); // uses the public, published articles
    const categories = articles.map(article => article.category);
    return [...new Set(categories)];
}

export async function getRecentArticles(limit: number): Promise<NewsArticle[]> {
    const articles = await getNewsArticles();
    return articles.slice(0, limit);
}


// Admin-facing functions
export async function getAllNewsArticles(): Promise<NewsArticle[]> {
    try {
        const db = getDb();
        const articlesCol = collection(db, 'news');
        const q = query(articlesCol, orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
    } catch (e) {
        console.error("Error fetching all articles: ", e);
        return [];
    }
}

export async function getAdminArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
    try {
        const db = getDb();
        const articlesCol = collection(db, 'news');
        const q = query(articlesCol, where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
        return undefined;
        }
        const docData = snapshot.docs[0];
        return { id: docData.id, ...docData.data() } as NewsArticle;
    } catch (e) {
        console.error(`Error fetching admin article by slug ${slug}: `, e);
        return undefined;
    }
}

export async function createArticle(article: Omit<NewsArticle, 'id'>) {
    const db = getDb();
    const articlesCol = collection(db, 'news');
    const articleData = {
        ...article,
        date: new Date(article.date).toISOString()
    };
    const docRef = await addDoc(articlesCol, articleData)
        .catch(err => {
            const permissionError = new FirestorePermissionError({
                path: articlesCol.path,
                operation: 'create',
                requestResourceData: articleData,
            });
            errorEmitter.emit('permission-error', permissionError);
            throw permissionError; // Re-throw to be caught by caller
        });
    return docRef.id;
}

export async function updateArticle(id: string, article: Partial<NewsArticle>) {
    const db = getDb();
    const articleRef = doc(db, 'news', id);
    const articleData = {
        ...article,
        ...(article.date && { date: new Date(article.date).toISOString() })
    };
    await updateDoc(articleRef, articleData)
        .catch(err => {
            const permissionError = new FirestorePermissionError({
                path: articleRef.path,
                operation: 'update',
                requestResourceData: articleData,
            });
            errorEmitter.emit('permission-error', permissionError);
            throw permissionError;
        });
}

export async function deleteArticle(id: string) {
    const db = getDb();
    const articleRef = doc(db, 'news', id);
    await deleteDoc(articleRef)
        .catch(err => {
            const permissionError = new FirestorePermissionError({
                path: articleRef.path,
                operation: 'delete',
            });
            errorEmitter.emit('permission-error', permissionError);
            throw permissionError;
        });
}
