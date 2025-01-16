import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsIcon from '@mui/icons-material/Sports';
import HikingIcon from '@mui/icons-material/Hiking';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export const mockUsers = [
  { id: 1, name: 'Εσείς', avatar: 'Ε' },
  { id: 2, name: 'Πελαγία Χ.', avatar: 'Π' },
  { id: 3, name: 'Νίκος Α.', avatar: 'N' },
  { id: 4, name: 'Ελένη Μ.', avatar: 'E' },
  { id: 5, name: 'Δημήτρης Λ.', avatar: 'Δ' }
];

export const eventsByLocation = {
  'beach': [
    {
      id: 1,
      title: 'Beach Party',
      description: 'Πάρτι στην παραλία με DJ και cocktails. Live μουσική, χορός και διασκέδαση κάτω από τα αστέρια.',
      type: 'concert',
      date: '2024-03-25',
      time: '20:00',
      location: 'Παραλία Camping',
      capacity: 100,
      participants: 45,
      iconType: 'music',
      chat: [
        { userId: 1, message: 'Θα έχει ωραία κοκτέιλ!', timestamp: '2024-03-24T18:30:00' },
        { userId: 3, message: 'Ποιος DJ θα παίζει;', timestamp: '2024-03-24T18:35:00' },
        { userId: 2, message: 'Έρχομαι κι εγώ!', timestamp: '2024-03-24T19:00:00' }
      ]
    },
    {
      id: 2,
      title: 'Τουρνουά Beach Volley',
      description: 'Διοργάνωση τουρνουά beach volley 4x4. Δηλώστε συμμετοχή με την ομάδα σας! Έπαθλα για τους νικητές.',
      type: 'sports',
      date: '2024-03-26',
      time: '16:00',
      location: 'Παραλία Camping',
      capacity: 32,
      participants: 24,
      iconType: 'sports',
      chat: [
        { userId: 4, message: 'Ψάχνω ομάδα!', timestamp: '2024-03-25T10:00:00' },
        { userId: 5, message: 'Έχουμε μία θέση ακόμα', timestamp: '2024-03-25T10:05:00' }
      ]
    },
    {
      id: 3,
      title: 'Μαθήματα Surfing',
      description: 'Μάθετε τα βασικά του surfing με έμπειρους εκπαιδευτές. Παρέχεται όλος ο εξοπλισμός.',
      type: 'sports',
      date: '2024-03-27',
      time: '10:00',
      location: 'Παραλία Camping',
      capacity: 15,
      participants: 8,
      iconType: 'sports',
      chat: []
    },
    {
      id: 4,
      title: 'Sunset Yoga',
      description: 'Χαλαρωτική yoga στην παραλία με θέα το ηλιοβασίλεμα. Κατάλληλο για όλα τα επίπεδα.',
      type: 'sports',
      date: '2024-03-28',
      time: '19:00',
      location: 'Παραλία Camping',
      capacity: 25,
      participants: 15,
      iconType: 'sports',
      chat: []
    },
    {
      id: 5,
      title: 'Θαλάσσια Εξερεύνηση',
      description: 'Εξερευνήστε τον υποθαλάσσιο κόσμο με καταδύσεις και snorkeling. Περιλαμβάνεται εξοπλισμός και εκπαίδευση.',
      type: 'sports',
      date: '2024-03-29',
      time: '11:00',
      location: 'Παραλία Camping',
      capacity: 20,
      participants: 12,
      iconType: 'sports',
      chat: []
    }
  ],
  'mountain': [
    {
      id: 6,
      title: 'Πεζοπορία στο Μονοπάτι',
      description: 'Οργανωμένη πεζοπορία με ξεναγό στα πιο όμορφα μονοπάτια του βουνού. Ανακαλύψτε κρυμμένες ομορφιές της φύσης.',
      type: 'hiking',
      date: '2024-03-27',
      time: '09:00',
      location: 'Είσοδος Camping',
      capacity: 20,
      participants: 12,
      iconType: 'hiking',
      chat: [
        { userId: 1, message: 'Πόση ώρα θα διαρκέσει;', timestamp: '2024-03-26T15:00:00' },
        { userId: 2, message: 'Περίπου 2 ώρες', timestamp: '2024-03-26T15:05:00' }
      ]
    },
    {
      id: 7,
      title: 'Βραδιά Φαγητού',
      description: 'Παραδοσιακά ορεινά φαγητά της περιοχής. Γευστική εξερεύνηση τοπικών γεύσεων με ζωντανή παραδοσιακή μουσική.',
      type: 'food',
      date: '2024-03-27',
      time: '20:00',
      location: 'Εστιατόριο Camping',
      capacity: 50,
      participants: 30,
      iconType: 'food',
      chat: [
        { userId: 3, message: 'Τι φαγητά θα έχει;', timestamp: '2024-03-26T16:00:00' },
        { userId: 5, message: 'Θα υπάρχουν και χορτοφαγικές επιλογές;', timestamp: '2024-03-26T16:30:00' }
      ]
    },
    {
      id: 8,
      title: 'Μαθήματα Αναρρίχησης',
      description: 'Βασικές τεχνικές αναρρίχησης για αρχάριους. Ασφαλής εκμάθηση με πιστοποιημένους εκπαιδευτές.',
      type: 'sports',
      date: '2024-03-28',
      time: '11:00',
      location: 'Πεδίο Αναρρίχησης',
      capacity: 12,
      participants: 6,
      iconType: 'sports',
      chat: []
    },
    {
      id: 9,
      title: 'Νυχτερινή Παρατήρηση Αστεριών',
      description: 'Ανακαλύψτε τον νυχτερινό ουρανό με τηλεσκόπια και έμπειρους αστρονόμους. Μάθετε για τους αστερισμούς.',
      type: 'hiking',
      date: '2024-03-29',
      time: '21:00',
      location: 'Κορυφή Βουνού',
      capacity: 30,
      participants: 18,
      iconType: 'hiking',
      chat: []
    },
    {
      id: 10,
      title: 'Mountain Bike Tour',
      description: 'Εξερευνήστε τα ορεινά μονοπάτια με ποδήλατο βουνού. Διαδρομές για όλα τα επίπεδα.',
      type: 'sports',
      date: '2024-03-30',
      time: '10:00',
      location: 'Κέντρο Mountain Bike',
      capacity: 15,
      participants: 8,
      iconType: 'sports',
      chat: []
    }
  ]
}; 