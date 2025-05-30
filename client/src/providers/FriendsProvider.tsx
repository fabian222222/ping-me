import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from "react";
import {
    Friend,
    FriendRequest,
    getFriends,
    getPendingRequests,
    sendFriendRequest as sendRequest,
    acceptFriendRequest as acceptRequest,
    rejectFriendRequest as rejectRequest,
} from "@/services/friends.service";

interface FriendsContextType {
    friends: Friend[];
    pendingRequests: FriendRequest[];
    loadFriends: () => Promise<void>;
    loadPendingRequests: () => Promise<void>;
    sendFriendRequest: (receiverId: string) => Promise<void>;
    acceptFriendRequest: (requestId: string) => Promise<void>;
    rejectFriendRequest: (requestId: string) => Promise<void>;
}

const FriendsContext = createContext<FriendsContextType | undefined>(undefined);

export const FriendsProvider = ({ children }: { children: ReactNode }) => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>([]);

    const loadFriends = useCallback(async () => {
        try {
            const friendsList = await getFriends();
            setFriends(friendsList);
        } catch (error) {
            console.error("Error loading friends:", error);
        }
    }, []);

    const loadPendingRequests = useCallback(async () => {
        try {
            const requests = await getPendingRequests();
            setPendingRequests(requests);
        } catch (error) {
            console.error("Error loading pending requests:", error);
        }
    }, []);

    const sendFriendRequest = useCallback(
        async (receiverId: string) => {
            try {
                await sendRequest(receiverId);
                await loadPendingRequests();
            } catch (error) {
                console.error("Error sending friend request:", error);
                throw error;
            }
        },
        [loadPendingRequests]
    );

    const acceptFriendRequest = useCallback(
        async (requestId: string) => {
            try {
                await acceptRequest(requestId);
                await Promise.all([loadFriends(), loadPendingRequests()]);
            } catch (error) {
                console.error("Error accepting friend request:", error);
                throw error;
            }
        },
        [loadFriends, loadPendingRequests]
    );

    const rejectFriendRequest = useCallback(
        async (requestId: string) => {
            try {
                await rejectRequest(requestId);
                await loadPendingRequests();
            } catch (error) {
                console.error("Error rejecting friend request:", error);
                throw error;
            }
        },
        [loadPendingRequests]
    );

    const value = {
        friends,
        pendingRequests,
        loadFriends,
        loadPendingRequests,
        sendFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
    };

    return (
        <FriendsContext.Provider value={value}>
            {children}
        </FriendsContext.Provider>
    );
};

export const useFriends = () => {
    const context = useContext(FriendsContext);
    if (context === undefined) {
        throw new Error("useFriends must be used within a FriendsProvider");
    }
    return context;
};
